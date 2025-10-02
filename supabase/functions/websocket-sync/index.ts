import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import { RealtimeChannel } from '@supabase/realtime-js';

interface WebSocketMessage {
  event: 'new_file' | 'file_updated' | 'file_deleted' | 'rescan_request' | 'folder_watch_start';
  data: any;
  userId: string;
}

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body: WebSocketMessage = await req.json();
    const { event, data, userId } = body;

    // Validate user authentication
    const { user, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get the channel specific to the user
    const channel: RealtimeChannel = supabaseClient
      .channel(`plr-sync:${userId}`)
      .subscribe((status) => {
        console.log(`Channel status: ${status}`);
      });

    // Handle different event types
    switch (event) {
      case 'new_file':
        await handleNewFile(channel, data);
        break;
      case 'file_updated':
        await handleFileUpdate(channel, data);
        break;
      case 'file_deleted':
        await handleFileDelete(channel, data);
        break;
      case 'rescan_request':
        await handleRescanRequest(channel, data);
        break;
      case 'folder_watch_start':
        await handleFolderWatch(channel, data);
        break;
      default:
        return new Response('Invalid event type', { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing WebSocket message:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

async function handleNewFile(channel: RealtimeChannel, data: any) {
  await channel.send({
    type: 'broadcast',
    event: 'new_file',
    payload: {
      file: data,
      timestamp: new Date().toISOString(),
    },
  });
}

async function handleFileUpdate(channel: RealtimeChannel, data: any) {
  await channel.send({
    type: 'broadcast',
    event: 'file_updated',
    payload: {
      file: data,
      timestamp: new Date().toISOString(),
    },
  });
}

async function handleFileDelete(channel: RealtimeChannel, data: any) {
  await channel.send({
    type: 'broadcast',
    event: 'file_deleted',
    payload: {
      fileId: data.fileId,
      timestamp: new Date().toISOString(),
    },
  });
}

async function handleRescanRequest(channel: RealtimeChannel, data: any) {
  await channel.send({
    type: 'broadcast',
    event: 'rescan_request',
    payload: {
      folderId: data.folderId,
      timestamp: new Date().toISOString(),
    },
  });
}

async function handleFolderWatch(channel: RealtimeChannel, data: any) {
  await channel.send({
    type: 'broadcast',
    event: 'folder_watch_start',
    payload: {
      folder: data,
      timestamp: new Date().toISOString(),
    },
  });
}