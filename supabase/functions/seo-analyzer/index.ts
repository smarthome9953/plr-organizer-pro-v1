import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, targetKeyword } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Calling Lovable AI for SEO analysis");

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
            content: `You are an expert SEO analyzer for PLR content. Analyze the provided content for SEO effectiveness and provide detailed recommendations.`,
          },
          {
            role: "user",
            content: `Analyze this PLR content for SEO effectiveness. Target keyword: "${targetKeyword || "not specified"}"\n\n${content}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_seo",
              description: "Analyze content for SEO and return structured results",
              parameters: {
                type: "object",
                properties: {
                  overallScore: { type: "number", description: "Overall SEO score 0-100" },
                  keywordDensity: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        density: { type: "number" },
                        recommendation: { type: "string" },
                      },
                      required: ["keyword", "density", "recommendation"],
                    },
                  },
                  readabilityScore: {
                    type: "object",
                    properties: {
                      score: { type: "number" },
                      level: { type: "string" },
                      recommendation: { type: "string" },
                    },
                    required: ["score", "level", "recommendation"],
                  },
                  metaTags: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      recommendation: { type: "string" },
                    },
                    required: ["title", "description", "recommendation"],
                  },
                  contentLength: {
                    type: "object",
                    properties: {
                      count: { type: "number" },
                      recommendation: { type: "string" },
                    },
                    required: ["count", "recommendation"],
                  },
                  suggestions: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["overallScore", "keywordDensity", "readabilityScore", "metaTags", "contentLength", "suggestions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_seo" } },
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
    console.error("Error in seo-analyzer function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
