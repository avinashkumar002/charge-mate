"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button/Button";
import ham from "./header-img/ham.svg";
import cross from "./header-img/cross.svg";
import { StaticImageData } from "next/image";

interface MobileMenuToggleProps {
  logo: StaticImageData;
  navItems: readonly { label: string; href: string }[];
}

export default function MobileMenuToggle({ logo, navItems }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={() => setIsOpen(true)}>
        <div className="p-3 bg-[#d9f99d] rounded-lg overflow-hidden">
          <div className="relative w-5 h-4">
            <Image src={ham} alt="menu" fill className="object-contain" sizes="100%" />
          </div>
        </div>
      </button>

      {/* Offcanvas Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4 backdrop-blur-[20px]">
          <Link href="/" onClick={handleClose} className="flex items-center gap-2 relative w-31.5 h-9.5">
            <Image src={logo} alt="EvSetu Logo" fill className="object-contain" sizes="100%" />
          </Link>

          <button onClick={handleClose}>
            <div className="relative w-6 h-6">
              <Image src={cross} alt="close" fill className="object-contain" sizes="100%" />
            </div>
          </button>
        </div>

        <nav className="flex flex-col gap-6 mt-8 px-6">
          {/* Nav Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className="py-3 px-4 text-black-700 hover:text-[#365314] hover:bg-[#f5f9f0] rounded-lg transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          {isAuthenticated && user && (
            <div className="flex flex-col gap-3 pt-4 border-t border-[#E5E5E5]">
              <Link
                href="/profile"
                onClick={handleClose}
                className="flex items-center gap-3 py-3 px-4 hover:bg-[#f5f9f0] rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-[#d9f99d] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-[#365314]">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-black-800">My Profile</span>
              </Link>

              <Link
                href={user.role === "driver" ? "/driver" : "/host"}
                onClick={handleClose}
                className="flex items-center gap-3 py-3 px-4 hover:bg-[#f5f9f0] rounded-lg transition-colors"
              >
                <span className="text-lg">📊</span>
                <span className="font-medium text-black-800">Dashboard</span>
              </Link>

              <div className="pt-2">
                <Button
                  text="Logout"
                  bg="#FFFFFF"
                  color="#DC2626"
                  hoverBg="#FEE2E2"
                  variant="sm"
                  boxShadow="inset 0 0 0 1px #E5E5E5"
                  className="w-full"
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                />
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={handleClose} />
      )}
    </>
  );
}