// components/RouteGuard.tsx
"use client";
import { useRouter } from "@/i18n/routing"; // Assuming you're using Next.js routing
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts";

export const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // If authenticated, render the children
  return isAuthenticated ? <>{children}</> : null;
};
