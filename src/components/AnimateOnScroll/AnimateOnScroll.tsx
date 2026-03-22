"use client";
import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  className = "",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? undefined : 0,
        animation: isInView
          ? `${animation} ${duration}s ease-out ${delay}s both`
          : "none",
      }}
    >
      {children}
    </div>
  );
}