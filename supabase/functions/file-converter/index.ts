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
    const { content, sourceFormat, targetFormat, options } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Converting from ${sourceFormat || 'txt'} to ${targetFormat || 'html'}`);

    // Use AI to convert content between formats
    const systemPrompt = `You are a document format converter. Convert the provided content from ${sourceFormat || 'plain text'} to ${targetFormat || 'HTML'} format.

Conversion guidelines:
- Preserve all content and meaning
- Maintain document structure (headings, paragraphs, lists)
- ${options?.preserveFormatting ? 'Preserve original formatting as closely as possible' : 'Clean up formatting for the target format'}
- ${options?.cleanHtml ? 'Generate clean, semantic HTML without inline styles' : ''}
- ${options?.wordpress ? 'Make the output WordPress-compatible with proper HTML structure' : ''}

Output ONLY the converted content, no explanations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Convert this content:\n\n${content}` }
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
    const convertedContent = data.choices?.[0]?.message?.content || "";

    return new Response(
      JSON.stringify({
        success: true,
        convertedContent,
        sourceFormat: sourceFormat || 'txt',
        targetFormat: targetFormat || 'html',
        originalLength: content.length,
        convertedLength: convertedContent.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in file-converter function:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
