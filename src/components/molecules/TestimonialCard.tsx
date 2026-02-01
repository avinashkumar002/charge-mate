"use client";

import Comma from "@/assets/svgs/Comma";
import Star from "@/assets/svgs/Star";
import Typography from "@/components/Typography/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface TestimonialCardProps {
  stars: number;            // Number of stars to show (1–5)
  title: string;            // Testimonial title
  comment: string;          // Testimonial comment paragraph
  author: string;           // Author text
}

export default function TestimonialCard({
  stars,
  title,
  comment,
  author,
}: TestimonialCardProps) {

  // You used isMd in your original card
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <div className="py-6 md:py-[30px] px-5 md:px-6 flex flex-col gap-4 md:gap-5 rounded-2xl bg-white max-w-[364px] md:min-h-80 shadow-[0px_2px_16px_0px_#1B62F51F]">
      
      {/* Top Row */}
      <div className="flex justify-between">
        <div>
          <Comma />
        </div>

        <div className="flex">
          {Array.from({ length: stars }).map((_, idx) => (
            <Star key={idx} />
          ))}
        </div>
      </div>

      {/* Main Text */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-[18px] leading-7 md:text-[20px] md:leading-[30px] tracking-0 text-black-900">
          {title}
        </h4>

        <Typography
          variant="para"
          weight={400}
          lineHeight={24}
          className="text-black-600"
          maxLines={4}
        >
          {comment}
        </Typography>
      </div>

      {/* Author */}
      <div>
        <Typography
          variant="body"
          weight={600}
          lineHeight={isMd ? 28 : 24}
          className="text-[#0A0A0A]"
        >
          {author}
        </Typography>
      </div>
    </div>
  );
}
