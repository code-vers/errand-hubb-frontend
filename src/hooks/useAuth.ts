"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { showSpamAlert } from '@/components/ui/SpamAlertToast';

const formatErrorMessage = (property?: string, message?: string): string => {
  const msg = message || "";
  const prop = property || "";

  if (msg.includes("email must be an email") || (prop === "email" && msg.includes("must be an email"))) {
    return "Please enter a valid email address.";
  }
  if (
    (msg.toLowerCase().includes("phone") || prop === "phone") &&
    (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exist") || msg.toLowerCase().includes("registered") || msg.toLowerCase().includes("unique"))
  ) {
    return "This phone number is already registered. Please sign in or use a different phone number.";
  }
  if (msg.includes("longer than or equal to")) {
    return "Password must be at least 8 characters long.";
  }
  return prop ? `${prop}: ${msg}` : msg;
};

const handleApiError = (error: any) => {
  if (error.errors && Array.isArray(error.errors)) {
    error.errors.forEach((err: any) => {
      toast.error(formatErrorMessage(err.property, err.message));
    });
    return;
  }

  if (Array.isArray(error.message)) {
    error.message.forEach((msg: string) => {
      toast.error(formatErrorMessage(undefined, msg));
    });
    return;
  }

  if (typeof error.message === 'string') {
    toast.error(formatErrorMessage(undefined, error.message));
    return;
  }

  toast.error('Action failed. Please try again.');
};

export const useRegisterClient = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: any) => authService.registerClient(data),
    onSuccess: () => {
      showSpamAlert('Registration successful! Please check your email to verify your account before logging in.');
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
      showSpamAlert('ErrandR profile created! Please check your email to verify your account before logging in.');
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
