import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, uniquenessLevel, protectedTerms, paragraphRestructuring, maintainKeywords, enhanceReadability } = await req.json();

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

    const protectedTermsList = protectedTerms
      ? protectedTerms.split(",").map((term: string) => term.trim())
      : [];

    const uniquenessDescription =
      uniquenessLevel < 40
        ? "light rewriting while keeping most of the original structure"
        : uniquenessLevel < 70
        ? "medium rewriting with moderate restructuring"
        : "aggressive rewriting with substantial changes to sentence structure and wording";

    let systemPrompt = `You are an AI content spinner that helps rewrite content to make it unique while preserving the original meaning. 
Apply ${uniquenessDescription} to the content.`;

    if (protectedTermsList.length > 0) {
      systemPrompt += ` The following terms should remain unchanged: ${protectedTermsList.join(", ")}.`;
    }

    if (paragraphRestructuring) {
      systemPrompt += " Restructure paragraphs and change their order where appropriate.";
    }

    if (maintainKeywords) {
      systemPrompt += " Preserve SEO-relevant keywords throughout the content.";
    }

    if (enhanceReadability) {
      systemPrompt += " Improve sentence flow, clarity, and overall readability.";
    }

    systemPrompt += " Maintain the same overall topic and key information. The rewritten content should be similar in length to the original.";

    console.log("Calling Lovable AI to spin content with uniqueness level:", uniquenessLevel);

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
          { role: "user", content: `Please rewrite the following content:\n\n${content}` },
        ],
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
      
      return new Response(
        JSON.stringify({ error: "Error processing content" }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const spunContent = data.choices?.[0]?.message?.content || "";

    // Calculate uniqueness score based on content difference
    const originalWords = content.toLowerCase().split(/\s+/);
    const spunWords = spunContent.toLowerCase().split(/\s+/);
    const originalSet = new Set(originalWords);
    const spunSet = new Set(spunWords);
    
    let commonWords = 0;
    spunSet.forEach(word => {
      if (originalSet.has(word)) commonWords++;
    });
    
    const uniquenessScore = Math.round(100 - (commonWords / spunSet.size * 100));

    return new Response(
      JSON.stringify({
        spunContent,
        uniquenessScore: Math.max(uniquenessScore, uniquenessLevel - 10),
        originalLength: content.length,
        spunLength: spunContent.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Error in content-spinner function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
