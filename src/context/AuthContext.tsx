"use client";
import { UserRole } from "@/types/dashboard";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  isTwoFactorEnabled?: boolean;
  profile?: any;
}

interface LogoutOptions {
  skipConfirmation?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User, redirectUrl?: string) => void;
  logout: (options?: LogoutOptions | any) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("errand_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("errand_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (userData: User, redirectUrl?: string) => {
      setUser(userData);
      localStorage.setItem("errand_user", JSON.stringify(userData));
      
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (userData.role === "client") {
        router.push("/dashboard/profile");
      } else {
        router.push("/dashboard");
      }
    },
    [router],
  );

  const confirmLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
    localStorage.removeItem("errand_user");
    setIsLogoutModalOpen(false);
    toast.success("Logged out successfully");
    router.push("/login");
  }, [router]);

  const logout = useCallback((options?: LogoutOptions | any) => {
    const skip = options && typeof options === "object" && options.skipConfirmation === true;
    if (skip) {
      confirmLogout();
    } else {
      setIsLogoutModalOpen(true);
    }
  }, [confirmLogout]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
      <ConfirmationDialog
        isOpen={isLogoutModalOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Yes, Logout"
        cancelLabel="Cancel"
        type="danger"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
