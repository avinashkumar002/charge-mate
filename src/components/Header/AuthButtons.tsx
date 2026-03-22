"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";

export default function AuthButtons() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex gap-3 items-center">
        <div className="px-5 py-2.5 flex items-center">
          <Spinner size="sm" color="#365314" />
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex gap-3 items-center">
        <Link href="/profile">
          <div className="w-9 h-9 bg-[#d9f99d] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#bef264] transition-colors">
            <span className="text-sm font-bold text-[#365314]">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </Link>
        <Button
          text="Logout"
          bg="#365314"
          color="#FFFFFF"
          hoverBg="#6FB500"
          variant="sm"
          onClick={logout}
        />
      </div>
    );
  }

  // Not logged in — no buttons (landing page is the auth entry point)
  return null;
}