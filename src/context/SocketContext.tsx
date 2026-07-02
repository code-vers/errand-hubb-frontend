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
      // Connect to the server root (not the prefixed API path)
      const serverUrl = API_CONFIG.BACKEND_URL.replace("/api/v1", "").replace(/\/+$/, "");
      const namespaceUrl = `${serverUrl}/messages`;
      
      console.log('CHAT: Connecting to root socket server at:', namespaceUrl);
      
      const token = typeof window !== 'undefined' 
        ? (localStorage.getItem('errand_token') || localStorage.getItem('token') || localStorage.getItem('accessToken')) 
        : null;

      const newSocket = io(namespaceUrl, {
        withCredentials: true,
        transports: ['polling', 'websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 10,
        timeout: 10000,
        auth: {
          token: token
        }
      });

      newSocket.on('connect', () => {
        console.log('CHAT: CONNECTION SUCCESS! ID:', newSocket.id);
        setIsConnected(true);
      });

      newSocket.on('connect_error', (error) => {
        console.error('CHAT: Handshake error:', error.message);
        setIsConnected(false);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('CHAT: DISCONNECTED:', reason);
        setIsConnected(false);
      });

      newSocket.on('message_notification', (data) => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentConvId = urlParams.get('convId');
        
        if (window.location.pathname !== '/dashboard/messages' || currentConvId !== data.conversationId) {
          toast.info(`New message from ${data.senderName}`, {
            description: data.content.substring(0, 50) + (data.content.length > 50 ? '...' : ''),
            action: {
              label: 'View',
              onClick: () => {
                window.location.href = `/dashboard/messages?convId=${data.conversationId}`;
              }
            }
          });
        }
      });

      setSocket(newSocket);

      return () => {
        console.log('CHAT: Connection shutdown');
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
    if (socket && isConnected) {
      socket.emit(event, data);
    } else {
      console.warn('CHAT: Attempted emit while not connected:', event);
    }
  }, [socket, isConnected]);

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
