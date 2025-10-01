
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabase = createClient(
      supabaseUrl!,
      supabaseServiceKey!
    );

    // Extract the request body
    const { content, targetKeyword } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Skip OpenAI call if no API key
    if (!openAiApiKey) {
      console.log("OpenAI API key not found, returning fallback result");
      return new Response(
        JSON.stringify({
          message: "OpenAI API key not found. Using fallback demo data.",
          demo: true,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Call OpenAI for SEO analysis
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert SEO analyzer for PLR content. 
            Analyze the provided content for SEO effectiveness and provide detailed recommendations.
            Format your response as a JSON object with the following structure:
            {
              "overallScore": [number from 0-100],
              "keywordDensity": [
                {
                  "keyword": [string - main keyword or phrase],
                  "density": [number - percentage],
                  "recommendation": [string - suggestion to improve]
                }
              ],
              "readabilityScore": {
                "score": [number from 0-100],
                "level": [string - e.g. "Very Easy", "Fairly Easy", "Standard", "Difficult"],
                "recommendation": [string - suggestion to improve]
              },
              "metaTags": {
                "title": [string - suggested title tag],
                "description": [string - suggested meta description],
                "recommendation": [string - suggestion to improve]
              },
              "contentLength": {
                "count": [number - character count],
                "recommendation": [string - suggestion about length]
              },
              "suggestions": [array of strings with specific SEO improvements]
            }`
          },
          {
            role: "user",
            content: `Analyze this PLR content for SEO effectiveness. Target keyword: "${targetKeyword || "not specified"}"\n\n${content}`
          }
        ],
        temperature: 0.2,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      throw new Error(JSON.stringify(error));
    }

    const result = await openAIResponse.json();
    const analysis = JSON.parse(result.choices[0].message.content);

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in seo-analyzer function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
