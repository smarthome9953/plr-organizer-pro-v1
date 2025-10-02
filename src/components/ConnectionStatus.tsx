import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useWebSocket } from '@/context/WebSocketContext';

export function ConnectionStatus() {
  const { isConnected, isDesktopConnected, lastHeartbeat } = useWebSocket();

  const getStatusBadge = () => {
    if (!isConnected) {
      return (
        <Badge variant="destructive" className="gap-1">
          <WifiOff className="h-3 w-3" />
          Offline
        </Badge>
      );
    }
    
    if (isDesktopConnected) {
      return (
        <Badge variant="default" className="gap-1">
          <Wifi className="h-3 w-3" />
          Desktop Connected
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" className="gap-1">
        <Wifi className="h-3 w-3" />
        Web Only
      </Badge>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {getStatusBadge()}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
            <br />
            Desktop App: {isDesktopConnected ? 'Online' : 'Offline'}
            {lastHeartbeat && (
              <>
                <br />
                Last Heartbeat: {new Date(lastHeartbeat).toLocaleTimeString()}
              </>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}