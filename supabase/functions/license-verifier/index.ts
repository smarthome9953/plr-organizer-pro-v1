
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
    const { licenseText, queryType } = await req.json();

    if (!licenseText) {
      return new Response(
        JSON.stringify({ error: "License text is required" }),
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

    // Call OpenAI for license verification and analysis
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
            content: `You are an expert PLR license analyzer. 
            Analyze the provided license text and extract key information about usage rights.
            Format your response as a JSON object with the following structure:
            {
              "licenseType": [string - e.g. "Standard PLR", "MRR", "RR", "Limited PLR", etc.],
              "rights": {
                "canSell": [boolean],
                "canEdit": [boolean],
                "canDistribute": [boolean],
                "requiresAttribution": [boolean]
              },
              "limitations": [array of strings with specific limitations],
              "expirationInfo": [string - any details about expiration or time limits],
              "specialConditions": [array of strings with any special conditions],
              "recommendedActions": [array of strings with recommended actions],
              "riskLevel": [string - "Low", "Medium", "High"],
              "confidence": [number from 0-100]
            }`
          },
          {
            role: "user",
            content: queryType === "verification" 
              ? `Analyze this PLR license text and extract key information about usage rights:\n\n${licenseText}` 
              : `I want to ${queryType} with my PLR content. Is this allowed under this license?\n\n${licenseText}`
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
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
