"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Typography from "@/components/Typography/Typography";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "driver" | "host";
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not logged in → redirect to login
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // Wrong role → redirect to correct dashboard
      if (allowedRole && user?.role !== allowedRole) {
        if (user?.role === "driver") {
          router.push("/driver");
        } else {
          router.push("/host");
        }
      }
    }
  }, [loading, isAuthenticated, user, allowedRole, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h3">Loading...</Typography>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Wrong role
  if (allowedRole && user?.role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}