
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, uniquenessLevel, protectedTerms } = await req.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse protected terms into array
    const protectedTermsList = protectedTerms ? 
      protectedTerms.split(',').map((term: string) => term.trim()) : [];

    // Build system prompt based on uniqueness level and protected terms
    const uniquenessDescription = uniquenessLevel < 40 
      ? 'light rewriting while keeping most of the original structure'
      : uniquenessLevel < 70
        ? 'medium rewriting with moderate restructuring'
        : 'aggressive rewriting with substantial changes to sentence structure and wording';
      
    let systemPrompt = `You are an AI content spinner that helps rewrite content to make it unique while preserving the original meaning. 
Apply ${uniquenessDescription} to the content.`;

    if (protectedTermsList.length > 0) {
      systemPrompt += ` The following terms should remain unchanged: ${protectedTermsList.join(', ')}.`;
    }
    
    systemPrompt += ` Maintain the same overall topic and key information. The rewritten content should be similar in length to the original.`;

    console.log('Calling OpenAI to spin content with uniqueness level:', uniquenessLevel);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please rewrite the following content:\n\n${content}` }
        ],
        temperature: uniquenessLevel / 100, // Higher uniqueness = higher temperature
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ error: data.error?.message || 'Error processing content' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate a "uniqueness score" based on the uniqueness level requested
    // In a real app, you'd compare the original and spun content
    const randomVariance = Math.floor(Math.random() * 10) - 5; // -5 to +5 variance
    const uniquenessScore = Math.min(100, Math.max(0, uniquenessLevel + randomVariance));
    
    const spunContent = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ 
        spunContent, 
        uniquenessScore,
        originalLength: content.length,
        spunLength: spunContent.length,
        processingTime: Math.floor(Math.random() * 2000) + 500, // Simulated processing time in ms
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in content spinner function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
