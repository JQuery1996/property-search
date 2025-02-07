"use client";
// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { TUpdateProfile, TUser } from "@/types";
import Cookies from "js-cookie";
import { axiosInstance } from "@/client";
import { router } from "next/client";
import { PAGES } from "@/constants";
import { useRouter } from "@/i18n/routing";

interface AuthContextType {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  updateProfile: (body: TUpdateProfile) => Promise<void>; // Function to update user
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    (Cookies.get("token") as string) ?? null,
  );
  const [user, setUser] = useState<TUser | null>(
    Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
  );
  const [authLoading, setAuthLoading] = useState(false);
  const { replace } = useRouter();

  const login = (token: string, user: TUser) => {
    setToken(token);
    setUser(user);
    Cookies.set("token", token, { secure: true, expires: 365 });
    Cookies.set("user", JSON.stringify(user), { secure: true, expires: 365 });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    replace(PAGES.HOME);
  };
  // Function to update the user object
  const updateProfile = async (body: TUpdateProfile) => {
    setAuthLoading(true);
    try {
      // Add _method=PATCH to the body
      const requestBody = {
        ...body,
        _method: "PATCH",
      };

      // Make the POST request using axiosInstance
      const response = await axiosInstance.post("/profile/update", requestBody);
      const _user = response.data as TUser;

      setUser(_user);
      Cookies.set("user", JSON.stringify(_user), {
        secure: true,
        expires: 365,
      });
      // Return the response data
    } catch (error) {
      // Handle errors (they are already logged by the interceptor)
      console.error("Failed to update profile:", error);
      throw error; // Re-throw the error if you want to handle it further up the call stack
    } finally {
      setAuthLoading(false);
    }
  };
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
