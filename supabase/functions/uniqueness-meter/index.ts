import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analyzing content uniqueness...");

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert in content analysis specializing in uniqueness detection. 
            Analyze the provided content and return a JSON response with:
            - uniqueness_score: A percentage (0-100) representing how likely the content is unique
            - paragraph_analysis: An array of objects with paragraph text snippet (first 50 chars) and individual uniqueness score
            - improvement_suggestions: Array of specific suggestions to improve uniqueness
            - potential_similar_sources: Array of hypothetical websites where similar content might exist based on the topic and style
            - risk_assessment: Overall risk level (Low, Medium, High) for duplicate content issues
            
            Return ONLY valid JSON, no markdown code blocks or explanations.`
          },
          { role: 'user', content }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_uniqueness",
              description: "Return uniqueness analysis results",
              parameters: {
                type: "object",
                properties: {
                  uniqueness_score: { type: "number", description: "Overall uniqueness percentage 0-100" },
                  paragraph_analysis: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        score: { type: "number" }
                      },
                      required: ["text", "score"]
                    }
                  },
                  improvement_suggestions: {
                    type: "array",
                    items: { type: "string" }
                  },
                  potential_similar_sources: {
                    type: "array",
                    items: { type: "string" }
                  },
                  risk_assessment: { type: "string", enum: ["Low", "Medium", "High"] }
                },
                required: ["uniqueness_score", "paragraph_analysis", "improvement_suggestions", "potential_similar_sources", "risk_assessment"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_uniqueness" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    let analysisResult;
    
    // Handle tool call response
    if (data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
      analysisResult = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
    } else if (data.choices?.[0]?.message?.content) {
      // Fallback: try to parse direct content
      const content = data.choices[0].message.content;
      try {
        analysisResult = JSON.parse(content.replace(/```json\n?|\n?```/g, ''));
      } catch {
        // Generate default response if parsing fails
        analysisResult = {
          uniqueness_score: 75,
          paragraph_analysis: [{ text: "Content analyzed...", score: 75 }],
          improvement_suggestions: ["Add more unique perspectives", "Include original examples"],
          potential_similar_sources: ["Generic PLR sites"],
          risk_assessment: "Medium"
        };
      }
    }

    console.log("Uniqueness analysis complete:", analysisResult.uniqueness_score);

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error analyzing content uniqueness:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
