'use client';

import { createContext, useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(session?.user || null);
      setLoading(false);
    }
  }, [session, isPending]);

  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) return { success: false, error };
    return { success: true, data };
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
