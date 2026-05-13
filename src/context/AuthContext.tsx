"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getAuthStatus, logout as logoutAction } from "@/app/actions";

interface AuthContextValue {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isAdmin: false,
  setIsAdmin: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getAuthStatus().then(({ isAdmin }) => setIsAdmin(isAdmin));
  }, []);

  const logout = async () => {
    await logoutAction();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
