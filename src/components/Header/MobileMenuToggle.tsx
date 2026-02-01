"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography/Typography";
import Button from "../Button/Button";
import ScrollNavLink from "../ScrollNavLink/ScrollNavLink";
import ham from "./header-img/ham.svg";
import cross from "./header-img/cross.svg";
import world from "./header-img/world.svg";
import { StaticImageData } from "next/image";

interface MobileMenuToggleProps {
  logo: StaticImageData;
  navItems: readonly { label: string; target: string }[];
}

export default function MobileMenuToggle({ logo, navItems }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={() => setIsOpen(true)}>
        <div className="p-3 bg-[#d9f99d] rounded-lg overflow-hidden">
          <div className="relative w-5 h-4">
            <Image src={ham} alt="menu" fill className="object-contain" sizes="100%" priority />
          </div>
        </div>
      </button>

      {/* Offcanvas Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between p-4 backdrop-blur-[20px]">
          <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
            <Image src={logo} alt="ChargeMate Logo" fill className="object-contain" sizes="100%" priority />
          </Link>

          <button onClick={() => setIsOpen(false)}>
            <div className="relative w-6 h-6">
              <Image src={cross} alt="close" fill className="object-contain" sizes="100%" priority />
            </div>
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-8 px-6 bg-white">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <ScrollNavLink
                key={item.target}
                label={item.label}
                target={item.target}
                className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5"
                onAfterScroll={() => setIsOpen(false)}
              />
            ))}
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-3 w-full justify-center border border-[#2C7FFF33] rounded-lg">
              <div className="relative w-4 h-4">
                <Image src={world} alt="world" fill className="object-contain" sizes="100%" priority />
              </div>
              <Typography variant="body" weight={500} className="text-black-900">
                EN
              </Typography>
            </div>

            <Button
              text="Join"
              bg="#d9f99d"
              color="#101010"
              variant="sm"
              className="w-full"
              onClick={() => {
                const element = document.getElementById("waitlist-form");
                element?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
            />
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}