import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const handleApiError = (error: any) => {
  if (error.errors && Array.isArray(error.errors)) {
    // If we have specific field errors, show them specifically
    error.errors.forEach((err: any) => {
      toast.error(`${err.property}: ${err.message}`);
    });
  } else {
    toast.error(error.message || 'Action failed');
  }
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
  
  return useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      toast.success('Login successful!');
      queryClient.setQueryData(['user'], response.data.user);
      router.push('/dashboard');
    },
    onError: handleApiError,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success('Logged out');
      queryClient.setQueryData(['user'], null);
      router.push('/');
    },
    onError: handleApiError,
  });
};
