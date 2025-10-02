import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files } = await req.json();

    if (!files || !Array.isArray(files)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: files array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Analyzing ${files.length} files for PLR content...`);

    // Analyze files using Lovable AI
    const analysisPromises = files.map(async (file: any) => {
      const systemPrompt = `You are a PLR (Private Label Rights) content analyzer. Analyze the file information and determine:
1. Is this likely PLR content? (confidence score 0-100)
2. What type of PLR content is it? (ebook, article, graphic, template, course, audio, video, software)
3. What niche does it belong to? (health, business, finance, marketing, personal-development, technology, etc.)
4. What license type does it appear to have? (full-plr, plr-no-resell, mrr, rr, personal-use)
5. Quality rating (A, B, C, D)
6. Any detected tags or keywords

Response format must be a JSON object with: isPLR (boolean), confidence (number), contentType (string), niche (string), licenseType (string), qualityRating (string), tags (array of strings), reason (string explaining the analysis)`;

      const userPrompt = `Analyze this file:
Filename: ${file.name}
Size: ${file.size} bytes
Type: ${file.type}
Path: ${file.path}

Based on the filename, size, type, and path, determine if this is PLR content and provide detailed analysis.`;

      try {
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
              { role: "user", content: userPrompt },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "analyze_plr_content",
                  description: "Analyze file to determine if it's PLR content",
                  parameters: {
                    type: "object",
                    properties: {
                      isPLR: { type: "boolean", description: "Is this PLR content?" },
                      confidence: { type: "number", description: "Confidence score 0-100" },
                      contentType: { 
                        type: "string", 
                        enum: ["ebook", "article", "graphic", "template", "course", "audio", "video", "software"],
                        description: "Type of PLR content"
                      },
                      niche: { type: "string", description: "Content niche" },
                      licenseType: { 
                        type: "string",
                        enum: ["full-plr", "plr-no-resell", "mrr", "rr", "personal-use"],
                        description: "License type"
                      },
                      qualityRating: {
                        type: "string",
                        enum: ["A", "B", "C", "D"],
                        description: "Quality rating"
                      },
                      tags: {
                        type: "array",
                        items: { type: "string" },
                        description: "Detected tags/keywords"
                      },
                      reason: { type: "string", description: "Explanation of analysis" }
                    },
                    required: ["isPLR", "confidence", "contentType", "niche", "licenseType", "qualityRating", "tags", "reason"],
                    additionalProperties: false
                  }
                }
              }
            ],
            tool_choice: { type: "function", function: { name: "analyze_plr_content" } }
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`AI API error for ${file.name}:`, response.status, errorText);
          
          // Return fallback analysis
          return {
            file: file.path,
            isPLR: false,
            confidence: 0,
            contentType: "unknown",
            niche: "unknown",
            licenseType: "personal-use",
            qualityRating: "C",
            tags: [],
            reason: "AI analysis failed"
          };
        }

        const data = await response.json();
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
        
        if (!toolCall) {
          console.error(`No tool call in response for ${file.name}`);
          return {
            file: file.path,
            isPLR: false,
            confidence: 0,
            contentType: "unknown",
            niche: "unknown",
            licenseType: "personal-use",
            qualityRating: "C",
            tags: [],
            reason: "No analysis result"
          };
        }

        const analysis = JSON.parse(toolCall.function.arguments);
        
        return {
          file: file.path,
          ...analysis
        };
      } catch (error) {
        console.error(`Error analyzing ${file.name}:`, error);
        return {
          file: file.path,
          isPLR: false,
          confidence: 0,
          contentType: "unknown",
          niche: "unknown",
          licenseType: "personal-use",
          qualityRating: "C",
          tags: [],
          reason: `Analysis error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    });

    const results = await Promise.all(analysisPromises);
    
    console.log(`Analysis complete: ${results.filter(r => r.isPLR).length} PLR files detected`);

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in plr-analyzer:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
