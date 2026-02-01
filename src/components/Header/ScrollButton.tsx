"use client";
import Button from "../Button/Button";
import useScrollTo from "@/hooks/useScrollTo";

interface ScrollButtonProps {
  target: string;
  text: string;
  bg: string;
  color: string;
  hoverBg?: string;
  variant?: "sm" | "lg";
  className?: string;
  boxShadow?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function ScrollButton({ target, ...buttonProps }: ScrollButtonProps) {
  const scrollTo = useScrollTo();

  return <Button {...buttonProps} onClick={() => scrollTo(target)} />;
}