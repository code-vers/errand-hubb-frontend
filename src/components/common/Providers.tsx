'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { ConfirmationProvider } from '@/context/ConfirmationContext';
import { SocketProvider } from '@/context/SocketContext';
import { useState } from 'react';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfirmationProvider>
          <SocketProvider>
            {children}
            <Toaster position="top-right" richColors />
          </SocketProvider>
        </ConfirmationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
