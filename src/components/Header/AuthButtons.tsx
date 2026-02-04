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
        <Link href={user.role === "driver" ? "/driver" : "/host"}>
          <Button
            text="Dashboard"
            bg="#FFFFFF"
            color="#365314"
            hoverBg="#F9F9F9"
            variant="sm"
            boxShadow="inset 0 0 0 1px #365314"
          />
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

  return (
    <div className="flex gap-3 items-center">
      <Link href="/login">
        <Button
          text="Login"
          bg="#FFFFFF"
          color="#365314"
          hoverBg="#F9F9F9"
          variant="sm"
          boxShadow="inset 0 0 0 1px #365314"
        />
      </Link>
      <Link href="/signup">
        <Button
          text="Sign Up"
          bg="#d9f99d"
          color="#101010"
          hoverBg="#bef264"
          variant="sm"
        />
      </Link>
    </div>
  );
}