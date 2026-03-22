"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { StaticImageData } from "next/image";

interface HeaderLogoProps {
  logo: StaticImageData;
  mobile?: boolean;
}

export default function HeaderLogo({ logo, mobile }: HeaderLogoProps) {
  const { user, isAuthenticated } = useAuth();

  const href = isAuthenticated
    ? user?.role === "host"
      ? "/host"
      : "/driver"
    : "/";

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 relative ${
        mobile ? "w-31.5 h-9.5" : "w-50 h-20"
      }`}
    >
      <Image
        src={logo}
        alt="EvSetu Logo"
        fill
        className="object-contain"
        sizes="100%"
        priority
      />
    </Link>
  );
}