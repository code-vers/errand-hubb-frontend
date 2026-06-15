"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { API_CONFIG } from '@/configs/api.config';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback?: (data: any) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (user) {
      // MASTER SIMPLICITY: Connect to server root + namespace
      const serverRoot = API_CONFIG.BACKEND_URL.replace("/api/v1", "").replace(/\/+$/, "");
      const namespaceUrl = `\${serverRoot}/messages`;
      
      console.log('CHAT: Expert connecting to namespace:', namespaceUrl);
      
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('errand_token') || localStorage.getItem('token') || localStorage.getItem('accessToken')) 
        : null;

      console.log('CHAT: Debug - Handshake token present:', !!token);
      if (token) {
        console.log('CHAT: Debug - Token start:', token.substring(0, 10));
      }

      const newSocket = io(namespaceUrl, {
        withCredentials: true,
        transports: ['polling', 'websocket'], // Start with polling, upgrade to WS
        path: '/api/v1/socket.io', // MASTER FIX: Explicitly match the backend path to bypass 404
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        timeout: 20000,
        auth: {
          token: token
        }
      });

      newSocket.on('connect', () => {
        console.log('CHAT: Connection established! ID:', newSocket.id);
        setIsConnected(true);
      });

      newSocket.on('connect_error', (error) => {
        console.error('CHAT: Handshake failed:', error.message);
        setIsConnected(false);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('CHAT: Disconnected:', reason);
        setIsConnected(false);
      });

      newSocket.on('message_notification', (data) => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentConvId = urlParams.get('convId');
        
        if (window.location.pathname !== '/dashboard/messages' || currentConvId !== data.conversationId) {
          toast.info(`New message from \${data.senderName}`, {
            description: data.content.substring(0, 50) + (data.content.length > 50 ? '...' : ''),
            action: {
              label: 'View',
              onClick: () => {
                window.location.href = `/dashboard/messages?convId=\${data.conversationId}`;
              }
            }
          });
        }
      });

      setSocket(newSocket);

      return () => {
        console.log('CHAT: Tearing down connection');
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [user]);

  const emit = useCallback((event: string, data: any) => {
    if (socket && socket.connected) {
      socket.emit(event, data);
    } else {
      console.warn('CHAT: Attempted emit while disconnected:', event);
    }
  }, [socket]);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  }, [socket]);

  const off = useCallback((event: string, callback?: (data: any) => void) => {
    if (socket) {
      if (callback) {
        socket.off(event, callback);
      } else {
        socket.off(event);
      }
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
