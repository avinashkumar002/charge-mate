"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Role = "Driver" | "Host";

interface Card {
    number: string;
    bgColor: string;
    icon: string;
    title: string;
    subtitle: React.ReactNode;
}

interface Props {
    data: Record<Role, Card[]>;
    activeRole: Role;
}

export default function HowItWorksSnake({ data, activeRole }: Props) {
    const isMd = useMediaQuery("(min-width: 768px)");
    const sectionRef = useRef<HTMLDivElement>(null);
    const drawRef = useRef<SVGPathElement>(null);
    const dotRefs = useRef<(SVGCircleElement | null)[]>([null, null, null]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

    useEffect(() => {
        const section = sectionRef.current;
        const draw = drawRef.current;
        if (!section || !draw) return;

        // Reset everything on role change
        draw.style.strokeDashoffset = "1200";
        dotRefs.current.forEach((dot) => {
            if (dot) dot.style.opacity = "0";
        });
        cardRefs.current.forEach((card) => {
            if (card) {
                card.style.opacity = "0";
                card.style.transform = "translateY(24px)";
            }
        });

        const onScroll = () => {
            const rect = section.getBoundingClientRect();
            const windowH = window.innerHeight;
            const progress = Math.min(
                Math.max((windowH - rect.top) / (windowH + rect.height), 0),
                1
            );

            // Drive snake
            draw.style.strokeDashoffset = String(1200 - progress * 1200);

            // Dots at 20%, 40%, 60%
            dotRefs.current.forEach((dot, i) => {
                if (!dot) return;
                dot.style.opacity = progress >= (i + 1) * 0.2 ? "1" : "0";
            });

            // Cards at 15%, 35%, 55% 
            const thresholds = [0.15, 0.35, 0.55];
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                if (progress >= thresholds[i]) {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [activeRole]);

    return (
        <div
            ref={sectionRef}
            className="relative bg-contain md:bg-cover bg-center bg-no-repeat"
        >
            {/* Snake SVG — desktop only */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-16 pointer-events-none z-0">
                <svg
                    width="64"
                    height="100%"
                    viewBox="0 0 64 520"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    {/* Background dashed track */}
                    <path
                        d="M32,0 C32,44 32,66 32,88 C32,132 10,140 10,173 C10,206 32,214 32,260 C32,306 54,314 54,347 C54,380 32,388 32,432 C32,476 32,498 32,520"
                        stroke="#d9f99d"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="8 5"
                        fill="none"
                    />
                    {/* Animated draw path */}
                    <path
                        ref={drawRef}
                        d="M32,0 C32,44 32,66 32,88 C32,132 10,140 10,173 C10,206 32,214 32,260 C32,306 54,314 54,347 C54,380 32,388 32,432 C32,476 32,498 32,520"
                        stroke="#65a30d"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="1200"
                        strokeDashoffset="1200"
                        style={{ transition: "stroke-dashoffset 0.1s linear" }}
                    />
                    {/* Connection dots */}
                    {([88, 260, 432] as const).map((cy, i) => (
                        <circle
                            key={cy}
                            ref={(el) => { dotRefs.current[i] = el; }}
                            cx="32"
                            cy={cy}
                            r="6"
                            fill="#365314"
                            stroke="#bef264"
                            strokeWidth="2.5"
                            style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                        />
                    ))}
                </svg>
            </div>

            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-[#d9f99d] z-0" />

            {/* Step cards */}
            <div className="flex flex-col relative z-10">
                {data[activeRole].map((card, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div
                            key={`${activeRole}-${card.number}`}
                            className="grid grid-cols-1 md:grid-cols-[1fr_64px_1fr] items-center min-h-40 md:min-h-43.25"
                        >
                            {/* Left slot */}
                            {isLeft ? (
                                <div className="flex md:justify-end pl-10 md:pl-0 md:pr-8">
                                    <div
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        className="bg-white border border-[#e5e7eb] rounded-2xl p-5 max-w-xs w-full"
                                        style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                                    >
                                        <StepCard card={card} isMd={isMd} />
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden md:block" />
                            )}

                            {/* Center node — desktop */}
                            <div className="hidden md:flex items-center justify-center">
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center border-4 border-white z-10 relative"
                                    style={{ backgroundColor: card.bgColor, boxShadow: "0 0 0 3px #bef264" }}
                                >
                                    <span className="text-[11px] font-bold text-white">{card.number}</span>
                                </div>
                            </div>

                            {/* Mobile node */}
                            <div
                                className="md:hidden absolute left-2.5 flex items-center justify-center w-6 h-6 rounded-full border-2 border-white z-10"
                                style={{ backgroundColor: card.bgColor, boxShadow: "0 0 0 2px #bef264", top: `${index * 173 + 65}px` }}
                            />

                            {/* Right slot */}
                            {!isLeft ? (
                                <div className="flex pl-10 md:pl-8">
                                    <div
                                        ref={(el) => { cardRefs.current[index] = el; }}
                                        className="bg-white border border-[#e5e7eb] rounded-2xl p-5 max-w-xs w-full"
                                        style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                                    >
                                        <StepCard card={card} isMd={isMd} />
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden md:block" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function StepCard({ card, isMd }: { card: Card; isMd: boolean }) {
    return (
        <>
            <div
                className="inline-flex items-center gap-1.5 py-1 px-3 rounded-3xl mb-3 text-[11px] font-semibold"
                style={{
                    backgroundColor: card.bgColor,
                    color: card.bgColor === "#365314" ? "#d9f99d" : "#1a2e05",
                }}
            >
                Step {card.number}
            </div>
            <div className="flex items-center gap-3 mb-2">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: card.bgColor }}
                >
                    <Image src={card.icon} alt={card.title} width={18} height={18} className="object-contain" />
                </div>
                <Typography variant="para" weight={600} lineHeight={isMd ? 22 : 20} className="text-[#0A0A0A]">
                    {card.title}
                </Typography>
            </div>
            <Typography variant="para" weight={400} lineHeight={isMd ? 20 : 18} className="text-black-600">
                {card.subtitle}
            </Typography>
        </>
    );
}