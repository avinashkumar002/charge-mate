"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, setLoading, logout as logoutAction } from "@/store/slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const checkUser = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
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
    if (isLoading) {
      checkUser();
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const response = await fetch(`/api/user/${session.user.id}`, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
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