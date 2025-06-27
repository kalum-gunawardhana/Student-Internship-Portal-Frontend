import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    setUser({ email });
  };

  const register = async (userData: any) => {
    // TODO: Implement actual registration logic
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
