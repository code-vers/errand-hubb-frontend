"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const handleApiError = (error: any) => {
  if (error.errors && Array.isArray(error.errors)) {
    error.errors.forEach((err: any) => {
      toast.error(`${err.property}: ${err.message}`);
    });
    return;
  }

  if (Array.isArray(error.message)) {
    error.message.forEach((msg: string) => {
      toast.error(msg);
    });
    return;
  }

  if (typeof error.message === 'string') {
    toast.error(error.message);
    return;
  }

  toast.error('Action failed. Please try again.');
};

export const useRegisterClient = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: any) => authService.registerClient(data),
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      router.push('/login');
    },
    onError: handleApiError,
  });
};

export const useRegisterErrand = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: any) => authService.registerErrand(data),
    onSuccess: () => {
      toast.success('ErrandR profile created! Please login.');
      router.push('/login');
    },
    onError: handleApiError,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      const userData = response.data.user;
      toast.success('Login successful!');
      queryClient.setQueryData(['user'], userData);
      login(userData);
    },
    onError: handleApiError,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success('Logged out');
      queryClient.setQueryData(['user'], null);
      logout();
    },
    onError: handleApiError,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: any) => authService.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: handleApiError,
  });
};
