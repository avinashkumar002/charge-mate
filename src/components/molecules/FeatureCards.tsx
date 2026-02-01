"use client";

import Image, { StaticImageData } from "next/image";
import Typography from "@/components/Typography/Typography";

interface FeatureCardProps {
    mainIcon: StaticImageData;
    mainIconAlt: string;
    title: string;
    subtitle: string;
    chipText: string;
    chipIcon?: StaticImageData;     // optional
    chipIconAlt?: string;
    chipIconBg?: boolean;           // default true → shows blue bg
}

export default function FeatureCard({
    mainIcon,
    mainIconAlt,
    title,
    subtitle,
    chipText,
    chipIcon,
    chipIconAlt = "",
    chipIconBg = true,
}: FeatureCardProps) {
    return (
        <div className="feature-card bg-white px-5 md:px-6 py-6 md:py-[30px] shadow-[0px_2px_12px_0px_#8888881F] rounded-2xl flex flex-col gap-4 md:gap-5 lg:max-w-[356px] h-full min-h-[262px] xl:max-h-[318px]">

            {/* Main Blue Icon */}
            <div className="p-2.5 bg-[#365314] rounded-xl flex items-center relative w-9 lg:w-[46px] h-9 lg:h-[46px]">
                <Image
                    src={mainIcon}
                    alt={mainIconAlt}
                    width={26}
                    height={26}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Title + Subtitle */}
            <div className="flex flex-col gap-2 md:gap-3">
                <Typography variant="h3" weight={600} className="text-black-900 leading-7! md:leading-8!">
                    {title}
                </Typography>
                <Typography variant="para" weight={400} className="text-black-600 leading-[22px]! md:leading-6!">
                    {subtitle}
                </Typography>
            </div>

            {/* Chip Row */}
            <div className="flex gap-2 items-center">
                <div
                    className={`rounded-xl flex items-center p-1.5 relative ${chipIconBg ? "bg-[#59A6FF]" : ""
                        }`}
                >
                    {/* Only show the icon when passed */}
                    {chipIcon && (
                        <Image
                            src={chipIcon}
                            alt={chipIconAlt}
                            width={12}
                            height={12}
                            className="object-contain"
                            priority
                        />
                    )}
                </div>

                <Typography variant="chip" weight={600} className="text-[1a2e05] leading-4! md:leading-[21px]!">
                    {chipText}
                </Typography>
            </div>
        </div>
    );
}
