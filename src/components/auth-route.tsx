"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../providers/auth-provider";
import { useRouter } from "next/navigation";

interface AuthRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const AuthRoute = ({
  children,
  fallback = (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
}: AuthRouteProps) => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading && isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  if (loading) return <>{fallback}</>;

  if (isAuthenticated) return null

  return <>{children}</>;
};

export default AuthRoute;
