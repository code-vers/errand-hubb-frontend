import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const handleApiError = (error: any) => {
  const responseData = error.response?.data;
  if (responseData?.errors && Array.isArray(responseData.errors)) {
    // If we have specific field errors, show them specifically
    responseData.errors.forEach((err: any) => {
      toast.error(`${err.property}: ${err.message}`);
    });
  } else {
    toast.error(responseData?.message || error.message || 'Action failed');
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
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: (credentials: any) => authService.login(credentials),
    onSuccess: (response: any) => {
      const userData = response.data.user;
      toast.success('Login successful!');
      
      // Update both React Query and AuthContext
      queryClient.setQueryData(['user'], userData);
      login(userData); // This also handles redirection
    },
    onError: handleApiError,
  });
};

export const useLogout = () => {
  const router = useRouter();
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
