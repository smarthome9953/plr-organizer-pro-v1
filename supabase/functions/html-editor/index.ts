import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { html, action, options } = await req.json();
    
    if (!html) {
      return new Response(
        JSON.stringify({ error: "HTML content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing HTML with action: ${action || 'validate'}`);
    
    let result: any = {
      success: true,
      originalSize: html.length
    };
    
    // Basic validation
    const validationIssues: string[] = [];
    
    // Check for unclosed tags (basic check)
    const openTags = html.match(/<[a-z][^>]*(?<!\/)>/gi) || [];
    const closeTags = html.match(/<\/[a-z][^>]*>/gi) || [];
    
    if (openTags.length !== closeTags.length) {
      validationIssues.push("Possible unclosed HTML tags detected");
    }
    
    // Check for deprecated tags
    const deprecatedTags = ['font', 'center', 'marquee', 'blink'];
    for (const tag of deprecatedTags) {
      if (new RegExp(`<${tag}[\\s>]`, 'i').test(html)) {
        validationIssues.push(`Deprecated <${tag}> tag found`);
      }
    }
    
    // Check for inline styles
    if (/<[^>]+style\s*=/i.test(html)) {
      validationIssues.push("Inline styles detected - consider using CSS classes");
    }
    
    // Check for missing alt on images
    if (/<img(?![^>]*alt\s*=)[^>]*>/i.test(html)) {
      validationIssues.push("Images without alt attributes found");
    }
    
    result.validation = {
      isValid: validationIssues.length === 0,
      issues: validationIssues
    };
    
    // Process based on action
    let processedHtml = html;
    
    if (action === 'clean' || action === 'optimize') {
      // Remove excessive whitespace
      processedHtml = html
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .replace(/\s+>/g, '>')
        .replace(/<\s+/g, '<');
      
      // Remove HTML comments (optional)
      if (options?.removeComments) {
        processedHtml = processedHtml.replace(/<!--[\s\S]*?-->/g, '');
      }
      
      // Remove empty attributes
      processedHtml = processedHtml.replace(/\s+[a-z-]+=""/gi, '');
      
      result.processedHtml = processedHtml;
      result.processedSize = processedHtml.length;
      result.reduction = html.length - processedHtml.length;
    }
    
    // Use AI for enhancement if requested
    if (action === 'enhance' && LOVABLE_API_KEY) {
      console.log("Using AI to enhance HTML...");
      
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
              content: `You are an HTML expert. Improve the provided HTML by:
              1. Adding semantic HTML5 tags where appropriate
              2. Improving accessibility (aria labels, alt text)
              3. Optimizing structure
              4. Fixing any validation issues
              
              Return ONLY the improved HTML code, no explanations or markdown.`
            },
            { role: 'user', content: html }
          ],
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
      } else {
        const data = await response.json();
        const enhancedHtml = data.choices?.[0]?.message?.content;
        if (enhancedHtml) {
          // Clean up any markdown code blocks that might have been added
          result.processedHtml = enhancedHtml
            .replace(/```html\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
          result.processedSize = result.processedHtml.length;
          result.aiEnhanced = true;
        }
      }
    }
    
    // Generate suggestions
    if (action === 'analyze') {
      result.suggestions = [];
      
      if (!/<meta\s+name="description"/i.test(html)) {
        result.suggestions.push("Add a meta description for better SEO");
      }
      
      if (!/<meta\s+name="viewport"/i.test(html)) {
        result.suggestions.push("Add viewport meta tag for mobile responsiveness");
      }
      
      if (!/<h1[\s>]/i.test(html)) {
        result.suggestions.push("Add an H1 heading for SEO");
      }
      
      if (/<table[\s>]/i.test(html) && !/<table[\s>][^>]*role/i.test(html)) {
        result.suggestions.push("Add role attribute to tables for accessibility");
      }
    }
    
    result.message = "HTML processed successfully";
    
    console.log(`HTML processing complete: ${result.validation?.issues?.length || 0} issues found`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in html-editor function:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
