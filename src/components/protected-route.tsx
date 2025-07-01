"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "../providers/auth-provider";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback = (
    <div className="w-full h-screen flex items-center justify-center">
      Loading...
    </div>
  ),
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/sign-in");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
