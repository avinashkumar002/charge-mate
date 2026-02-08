"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, setLoading, logout as logoutAction } from "@/store/slices/authSlice";
import { useGetUserByIdQuery } from "@/store/services/userApi";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const checkUser = useCallback(async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Fetch user data from our database
        const response = await fetch(`/api/user/${authUser.id}`);
        if (response.ok) {
          const userData = await response.json();
          dispatch(setUser(userData));
        } else {
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.error("Error checking user:", error);
      dispatch(setUser(null));
    }
  }, [dispatch]);

  useEffect(() => {
    // Only check if we're still loading
    if (isLoading) {
      checkUser();
    }

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const response = await fetch(`/api/user/${session.user.id}`);
          if (response.ok) {
            const userData = await response.json();
            dispatch(setUser(userData));
          }
        } else if (event === "SIGNED_OUT") {
          dispatch(logoutAction());
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isLoading, checkUser, dispatch]);

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch(logoutAction());
    router.push("/");
  };

  return {
    user,
    loading: isLoading,
    isAuthenticated,
    logout,
  };
}