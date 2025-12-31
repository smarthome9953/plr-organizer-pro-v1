import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files, findText, replaceText, options } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(
        JSON.stringify({ error: "Files array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing batch edit: find "${findText}", replace with "${replaceText}"`);
    console.log(`Options:`, options);
    console.log(`Processing ${files.length} files`);
    
    const results: Array<{
      originalName: string;
      processed: boolean;
      replacementsCount: number;
      content?: string;
      error?: string;
      aiEnhanced?: boolean;
    }> = [];
    const startTime = Date.now();
    
    for (const file of files) {
      let content = file.content || '';
      let replacementsCount = 0;
      
      if (findText && replaceText !== undefined) {
        // Build regex based on options
        let flags = 'g';
        if (!options?.caseSensitive) {
          flags += 'i';
        }
        
        let searchPattern: RegExp;
        if (options?.useRegex) {
          try {
            searchPattern = new RegExp(findText, flags);
          } catch (e) {
            results.push({
              originalName: file.name,
              processed: false,
              error: `Invalid regex: ${findText}`,
              replacementsCount: 0
            });
            continue;
          }
        } else {
          // Escape special regex characters for literal search
          const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          
          if (options?.wholeWord) {
            searchPattern = new RegExp(`\\b${escaped}\\b`, flags);
          } else {
            searchPattern = new RegExp(escaped, flags);
          }
        }
        
        // Count matches before replacing
        const matches = content.match(searchPattern);
        replacementsCount = matches ? matches.length : 0;
        
        // Perform replacement
        content = content.replace(searchPattern, replaceText);
      }
      
      results.push({
        originalName: file.name,
        processed: true,
        replacementsCount,
        content // Return modified content
      });
    }
    
    const processingTimeMs = Date.now() - startTime;
    const totalReplacements = results.reduce((acc, curr) => acc + (curr.replacementsCount || 0), 0);
    
    // If AI enhancement is requested, use Lovable AI
    if (options?.useAI && LOVABLE_API_KEY) {
      console.log("Using AI to enhance replacements...");
      
      for (let i = 0; i < results.length; i++) {
        if (!results[i].processed || !results[i].content) continue;
        
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
                content: 'You are a content editor. Clean up the provided text by fixing grammar, improving readability, and ensuring consistent formatting. Return ONLY the improved text, no explanations.'
              },
              { role: 'user', content: results[i].content }
            ],
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const enhancedContent = data.choices?.[0]?.message?.content;
          if (enhancedContent) {
            results[i].content = enhancedContent;
            results[i].aiEnhanced = true;
          }
        }
      }
    }
    
    console.log(`Batch edit complete: ${totalReplacements} replacements in ${processingTimeMs}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${files.length} files`,
        results,
        stats: {
          filesProcessed: files.length,
          totalReplacements,
          processingTimeMs
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in batch-editor function:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
