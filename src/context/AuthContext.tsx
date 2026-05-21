'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserRole } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  role: UserRole;
  name?: string;
  avatarUrl?: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const savedUser = localStorage.getItem('errand_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('errand_user');
      }
    }
    setIsLoading(false);
  }, []);
  const login = useCallback((email: string) => {
    let role: UserRole = 'client';
    if (email === 'errand@gmail.com') role = 'errand';
    else if (email === 'admin@gmail.com') role = 'admin';
    else if (email === 'client@gmail.com') role = 'client';
    else return;
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem('errand_user', JSON.stringify(newUser));
    if (role === 'client') {
      router.push('/dashboard/profile');
    } else {
      router.push('/dashboard');
    }
  }, [router]);
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('errand_user');
    router.push('/login');
  }, [router]);
  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
