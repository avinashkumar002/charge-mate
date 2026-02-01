"use client";
import Typography from "@/components/Typography/Typography";
import useScrollTo from "@/hooks/useScrollTo";

interface ScrollNavLinkProps {
  label: string;
  target: string;
  className?: string;
  typographyClassName?: string;
  onAfterScroll?: () => void;
}

export default function ScrollNavLink({ 
  label, 
  target, 
  className = "",
  typographyClassName = "cursor-pointer text-black-700 hover:text-black border-b-2 border-transparent hover:border-black inline-block transition-all duration-200",
  onAfterScroll 
}: ScrollNavLinkProps) {
  const scrollTo = useScrollTo();

  const handleClick = () => {
    scrollTo(target);
    onAfterScroll?.();
  };

  return (
    <div onClick={handleClick} className={className}>
      <Typography 
        variant="para" 
        weight={500}
        className={typographyClassName}
      >
        {label}
      </Typography>
    </div>
  );
}