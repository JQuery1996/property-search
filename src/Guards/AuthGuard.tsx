import { useAuth } from "@/contexts";
import { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  // If authenticated, render the children
  return isAuthenticated ? children : null;
}
