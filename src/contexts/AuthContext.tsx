import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as logoutUser } from '../mocks/auth';

// User interface for authentication
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'club' | 'admin';
  branch?: string;
  year?: string;
}

// Context interface for auth state and methods
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component for authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const existingUser = getCurrentUser();
    setUser(existingUser);
    setLoading(false);
  }, []);

  // Login function to set user state
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function to clear user state
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 