"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiRequest } from "../services/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ApiUser = Pick<User, "id" | "name" | "email">;

type AuthResponse = {
  user: ApiUser;
  token: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (user: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const toUser = (user: ApiUser): User => ({ ...user, role: "Team member" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const token = window.sessionStorage.getItem("authToken");

    if (!token) {
      setIsLoading(false);
      return () => {
        active = false;
      };
    }

    apiRequest<{ user: ApiUser }>("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ user: currentUser }) => {
        if (active) setUser(toUser(currentUser));
      })
      .catch((error: unknown) => {
        if (active) {
          setAuthError(error instanceof Error ? error.message : "Unable to restore the session.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    authError,
    login: async (email, password) => {
      const response = await apiRequest<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      window.sessionStorage.setItem("authToken", response.token);
      setUser(toUser(response.user));
      setAuthError(null);
    },
    register: async ({ name, email, password }) => {
      const response = await apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      window.sessionStorage.setItem("authToken", response.token);
      setUser(toUser(response.user));
      setAuthError(null);
    },
    logout: () => {
      window.sessionStorage.removeItem("authToken");
      setUser(null);
      setAuthError(null);
    },
  }), [authError, isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
