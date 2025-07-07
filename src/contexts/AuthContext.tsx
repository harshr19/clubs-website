import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, signIn, signOut, getCurrentSession } from '../lib/supabase';
// import { getCurrentUser, logout as logoutUser } from '../mocks/auth'; // Commented out mock auth

// User interface for authentication
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'club' | 'admin';
  branch?: string;
  year?: string;
  gender?: string;
  enrollment?: string;
  isProfileComplete?: boolean;  // Using camelCase which is the JavaScript convention
}

// Context interface for auth state and methods
interface AuthContextType {
  user: User | null;
  loading: boolean; 
  login: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  logout: () => Promise<{ success: boolean, error?: string }>;
  refreshUser: () => Promise<void>;  // Added function to refresh user data
  isAuthenticated: boolean;
}

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component for authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      try {
        // Add timeout to ensure loading state doesn't get stuck
        const sessionPromise = getCurrentSession();
        const timeoutPromise = new Promise(resolve => setTimeout(() => {
          console.log("Auth check timed out, continuing as logged out");
          resolve({ session: null, error: new Error("Timeout") });
        }, 3000));
        
        // Race between actual session check and timeout
        const { session, error } = await Promise.race([
          sessionPromise,
          timeoutPromise as Promise<any>
        ]);
        
        if (error && error.message !== "Timeout") {
          console.error("Error fetching session:", error);
          setUser(null);
        } else if (session) {
          // If we have a session, fetch the user profile from the database
          try {
            const { data, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profileError || !data) {
              console.error("Error fetching user profile:", profileError);
              // Create a basic user from auth data
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || 'User',
                role: 'student', // Default role
                isProfileComplete: false
              });
            } else {
              // Use the full profile data
              setUser(data as User);
            }
          } catch (profileFetchError) {
            console.error("Error during profile fetch:", profileFetchError);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Unexpected error during auth check:", error);
        setUser(null);
      } finally {
        // Ensure loading state is always set to false
        setLoading(false);
      }
    }
    
    fetchSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'SIGNED_IN' && session) {
          try {
            // Fetch user profile when signed in
            const { data, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error("Error fetching user profile:", error);
              // Fall back to basic user
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || 'User',
                role: 'student',
                isProfileComplete: false
              });
            } else {
              setUser(data as User);
            }
          } catch (e) {
            console.error("Exception during profile fetch:", e);
            // Fall back to basic user
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || 'User',
              role: 'student',
              isProfileComplete: false
            });
          }
        }
      }
    );
    
    // Clean up the subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Login function with Supabase
  const login = async (email: string, password: string) => {
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Auth state listener will update the user state
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'An unexpected error occurred' 
      };
    }
  };

  // Logout function with Supabase
  const logout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Auth state listener will update the user state
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'An unexpected error occurred' 
      };
    }
  };

  // Function to refresh user data from the database
  const refreshUser = async () => {
    try {
      const { session } = await getCurrentSession();
      if (session) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          console.log("Refreshing user data:", data);
          setUser(data as User);
        }
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      refreshUser,
      isAuthenticated: !!user 
    }}>
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