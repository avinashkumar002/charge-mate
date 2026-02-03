"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string;
    role: "driver" | "host";
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check current session
        checkUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    await fetchUserData(session.user.id);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    async function checkUser() {
        console.log(" Checking user session...");
        const { data: { user: authUser }, error } = await supabase.auth.getUser();

        console.log("Auth user:", authUser);
        console.log("Auth error:", error);

        if (authUser) {
            console.log(" User found, fetching data for:", authUser.id);
            await fetchUserData(authUser.id);
        } else {
            console.log(" No user session found");
        }
        setLoading(false);
    }

    async function fetchUserData(userId: string) {
        try {
            console.log("📡 Fetching user data from API:", `/api/user/${userId}`);
            const response = await fetch(`/api/user/${userId}`);
            console.log("API response status:", response.status);

            if (response.ok) {
                const userData = await response.json();
                console.log("✅ User data fetched:", userData);
                setUser(userData);
            } else {
                console.log("❌ API failed:", await response.text());
            }
        } catch (error) {
            console.error(" Error fetching user data:", error);
            setLoading(false);
        }
    }

    async function logout() {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    }

    return {
        user,
        loading,
        isAuthenticated: !!user,
        logout,
    };
}