import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { licenseText, queryType } = await req.json();

    if (!licenseText) {
      return new Response(
        JSON.stringify({ error: "License text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Calling Lovable AI for license verification");

    const userPrompt = queryType === "verification"
      ? `Analyze this PLR license text and extract key information about usage rights:\n\n${licenseText}`
      : `I want to ${queryType} with my PLR content. Is this allowed under this license?\n\n${licenseText}`;

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
            content: `You are an expert PLR license analyzer. Analyze the provided license text and extract key information about usage rights.`,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_license",
              description: "Analyze PLR license and return structured results",
              parameters: {
                type: "object",
                properties: {
                  licenseType: { type: "string", description: "Type of license (Standard PLR, MRR, RR, Limited PLR, etc.)" },
                  rights: {
                    type: "object",
                    properties: {
                      canSell: { type: "boolean" },
                      canEdit: { type: "boolean" },
                      canDistribute: { type: "boolean" },
                      requiresAttribution: { type: "boolean" },
                    },
                    required: ["canSell", "canEdit", "canDistribute", "requiresAttribution"],
                  },
                  limitations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific limitations",
                  },
                  expirationInfo: { type: "string", description: "Any expiration or time limit details" },
                  specialConditions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Any special conditions",
                  },
                  recommendedActions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended actions for the user",
                  },
                  riskLevel: { type: "string", enum: ["Low", "Medium", "High"], description: "Risk level assessment" },
                  confidence: { type: "number", description: "Confidence score 0-100" },
                },
                required: ["licenseType", "rights", "limitations", "expirationInfo", "specialConditions", "recommendedActions", "riskLevel", "confidence"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_license" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("No analysis result returned");
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in license-verifier function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
