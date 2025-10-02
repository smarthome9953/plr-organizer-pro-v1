import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/realtime-js';
import { toast } from 'sonner';

interface WebSocketContextType {
  isConnected: boolean;
  isDesktopConnected: boolean;
  lastHeartbeat: Date | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isDesktopConnected, setIsDesktopConnected] = useState(false);
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null);
  const [heartbeatInterval, setHeartbeatInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user) return;

    // Create and subscribe to the user-specific channel
    const newChannel = supabase.channel(`plr-sync:${user.id}`);

    // Handle connection status changes
    newChannel
      .on('presence_state', () => {
        setIsConnected(true);
      })
      .on('presence_diff', () => {
        setIsConnected(true);
      })
      .on('broadcast', { event: 'heartbeat' }, () => {
        setLastHeartbeat(new Date());
        setIsDesktopConnected(true);
      })
      .on('broadcast', { event: 'new_file' }, (payload) => {
        toast.success(`New PLR file detected: ${payload.file.name}`);
        // The FileExplorerContext will handle the actual file list update
      })
      .on('broadcast', { event: 'file_updated' }, (payload) => {
        toast.info(`File updated: ${payload.file.name}`);
      })
      .on('broadcast', { event: 'file_deleted' }, (payload) => {
        toast.info(`File removed: ${payload.fileId}`);
      })
      .subscribe((status) => {
        console.log('Channel status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    setChannel(newChannel);

    // Set up heartbeat check interval
    const interval = setInterval(() => {
      if (lastHeartbeat) {
        const timeSinceLastHeartbeat = Date.now() - lastHeartbeat.getTime();
        if (timeSinceLastHeartbeat > 35000) { // 35 seconds (30s heartbeat + 5s grace)
          setIsDesktopConnected(false);
        }
      }
    }, 5000);

    setHeartbeatInterval(interval);

    return () => {
      if (newChannel) {
        newChannel.unsubscribe();
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [user]);

  // Auto-reconnect logic
  useEffect(() => {
    if (!channel || isConnected) return;

    const reconnectTimeout = setTimeout(() => {
      channel.subscribe();
    }, 5000);

    return () => {
      clearTimeout(reconnectTimeout);
    };
  }, [channel, isConnected]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        isDesktopConnected,
        lastHeartbeat
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};