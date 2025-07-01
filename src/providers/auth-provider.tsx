"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/sign-in";
    }

    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get("/api/auth/me");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken.token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
