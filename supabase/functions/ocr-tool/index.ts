import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData, language, outputFormat } = await req.json();

    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing OCR for language: ${language || 'en'}, format: ${outputFormat || 'txt'}`);

    // Use Lovable AI with vision capability to extract text
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an OCR text extraction assistant. Extract all text from the provided image.
Output the extracted text in ${outputFormat || 'plain text'} format.
If there are tables, preserve the table structure.
If there are headings, preserve the heading hierarchy.
Language of the document: ${language || 'English'}.
Be accurate and preserve formatting where possible.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text from this image. Preserve the layout and formatting as much as possible."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData.startsWith('data:') ? imageData : `data:image/png;base64,${imageData}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.choices?.[0]?.message?.content || "";

    return new Response(
      JSON.stringify({
        success: true,
        extractedText,
        language: language || 'en',
        outputFormat: outputFormat || 'txt',
        characterCount: extractedText.length,
        wordCount: extractedText.split(/\s+/).filter(Boolean).length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in ocr-tool function:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
