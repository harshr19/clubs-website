import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireProfileComplete?: boolean;
  redirectTo?: string;
}

/**
 * Component to protect routes based on authentication state
 * 
 * @param children - The route content to render if conditions are met
 * @param requireAuth - Whether authentication is required for this route
 * @param requireAdmin - Whether admin role is required for this route
 * @param requireProfileComplete - Whether a complete profile is required
 * @param redirectTo - Where to redirect if conditions aren't met
 */
export default function ProtectedRoute({
  children,
  requireAuth = false,
  requireAdmin = false,
  requireProfileComplete = false,
  redirectTo = "/"
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Short loading indicator only if auth is actually needed
  if (loading && (requireAuth || requireAdmin || requireProfileComplete || !requireAuth && isAuthenticated)) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If auth check finished:
  
  // 1. Check if the route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if the route is for non-authenticated users only (like login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Check if route requires admin access
  if (requireAdmin && (!user || user.role !== "admin")) {
    return <Navigate to={redirectTo} replace />;
  }

  // 4. Check if route requires a complete profile
  if (requireProfileComplete && user && !user.isProfileComplete) {
    return <Navigate to="/profile-setup" replace />;
  }

  // All conditions passed or still loading but not relevant for this route, render the children
  return <>{children}</>;
}
