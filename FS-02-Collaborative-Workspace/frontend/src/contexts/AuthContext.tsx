"use client";

import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (user: Partial<User> & { email: string; password: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "user-1",
    name: "Ava Thompson",
    email: "ava@gather.app",
    role: "Product lead",
  });

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    login: (email: string, password: string) => {
      setUser({
        id: "user-1",
        name: "Ava Thompson",
        email,
        role: password ? "Team member" : "Product lead",
      });
    },
    register: ({ email, name, role }) => {
      setUser({
        id: `user-${Date.now()}`,
        name: name ?? "New member",
        email,
        role: role ?? "Team member",
      });
    },
    logout: () => setUser(null),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
