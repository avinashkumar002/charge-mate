"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import { FC, useState, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import Image from "next/image";
import Button from "@/components/Button/Button";
import glass from "@/assets/svgs/glass.svg"
import book from "@/assets/svgs/book.svg"
import paid from "@/assets/svgs/paid.svg"
import car from "@/assets/images/feature-car.png"
import realtime from "@/assets/svgs/real-time.svg"
import tick from "@/assets/svgs/tick.svg"
import verified from "@/assets/svgs/verifid.svg"
import arrow from "@/assets/svgs/arrow.svg"
import calender from "@/assets/svgs/calender.svg"
import dots from "@/assets/svgs/dots.svg"
import star from "@/assets/svgs/star.svg"
import BackgroundWave from "@/assets/svgs/BackgroundWave";
import FaqCar from "@/assets/svgs/FaqCar";
import parkedCar from "@/assets/svgs/parked-car.svg"
import EffortCard from "@/components/molecules/EffortCard";
import FeatureCard from "@/components/molecules/FeatureCards"
import FaqList from "@/components/molecules/Faq/FaqList";

import AnimatedCarSection from "@/components/molecules/AnimatedCarSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import useScrollTo from "@/hooks/useScrollTo";

import ScrollHandler from "@/components/molecules/ScrollHandle";
import AvatarGroup from "@/components/molecules/AvatarGroup";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import RatingStars from "@/assets/svgs/RatingStars";

import glassHost from "@/assets/svgs/glass-host.svg";
import bookHost from "@/assets/svgs/book-host.svg";
import paidHost from "@/assets/svgs/paid-host.svg";
import Verified from "@/assets/svgs/Verified";
import Guaranteed from "@/assets/svgs/Guaranteed";
import Effortless from "@/assets/svgs/Effortless";
import Link from "next/link";
import HowItWorksSnake from "@/components/molecules/HowItWorksSnake";
import TestimonialsBook from "@/components/molecules/TestimonialsBook";


const WaitlistPage: FC = () => {
    const isMd = useMediaQuery('(min-width: 768px)');
    const [activeRole, setActiveRole] = useState<"Driver" | "Host">("Driver");
    const data = {
        Driver: [
            {
                number: "01",
                bgColor: "#365314",
                icon: glass,
                title: "Find Nearby Chargers",
                subtitle: "Discover verified EV charging stations close to your location.",
            },
            {
                number: "02",
                bgColor: "#65a30d",
                icon: book,
                title: "Book Your Slot",
                subtitle: "View availability, compare prices, and reserve instantly.",
            },
            {
                number: "03",
                bgColor: "#bef264",
                icon: paid,
                title: "Charge with Confidence",
                subtitle: <>Navigate, plug in, and enjoy <span className="text-[#365314]">stress-free charging.</span></>,
            },
        ],
        Host: [
            {
                number: "01",
                bgColor: "#365314",
                icon: glassHost,
                title: "List Your Charger",
                subtitle: "Add your EV charger with photos and essential details.",
            },
            {
                number: "02",
                bgColor: "#65a30d",
                icon: bookHost,
                title: "Set Availability & Pricing",
                subtitle: "Choose available hours and set a fair charging rate.",
            },
            {
                number: "03",
                bgColor: "#bef264",
                icon: paidHost,
                title: "Host & Earn",
                subtitle: <>Accept bookings and<span className="text-[#365314]"> earn per charging session.</span></>,
            },
        ],
    };




    const scrollTo = useScrollTo();
    const [showAll, setShowAll] = useState(false);



    const slides = [
        {
            mainIcon: realtime,
            mainIconAlt: "realtime map",
            title: "Real-Time Charging point Maps",
            subtitle: "Find available EV chargers instantly with our live, dynamic map interface.",
            chipText: "Live Updates",
            chipIcon: undefined,
            chipIconBg: true,
        },
        {
            mainIcon: arrow,
            mainIconAlt: "arrow",
            title: "Simple Booking & Management",
            subtitle: "Book, manage, or cancel charging sessions easily in just a few taps.",
            chipText: "3 Simple Steps",
            chipIcon: dots,
            chipIconBg: false,
        },
        {
            mainIcon: verified,
            mainIconAlt: "verified",
            title: "Verified Secure Chargers",
            subtitle: "All charging points are verified to ensure safe, reliable charging always.",
            chipText: "100% Verified Hosts",
            chipIcon: tick,
            chipIconBg: true,
        },
        {
            mainIcon: calender,
            mainIconAlt: "calendar",
            title: "Event-Friendly Charger Discovery",
            subtitle: "Find chargers near you and compare distance, reviews, and availability.",
            chipText: "Event Optimized",
            chipIcon: star,
            chipIconBg: true,
        },
    ];

    const initialCount = 5;
    const handleToggleFaqs = () => {
        setShowAll(prev => !prev);
    };

    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            router.push(user.role === "host" ? "/host" : "/driver");
        }
    }, [loading, isAuthenticated, user, router]);

    return (
        <>
            <Suspense fallback={null}>
                <ScrollHandler />
            </Suspense>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#f0fdf4]">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 md:py-20">

                        {/* Left Content */}
                        <div className="flex flex-col gap-6 md:gap-8 flex-1 z-10">

                            {/* Eyebrow chip */}
                            <div className="w-max py-1.5 px-4 bg-[#365314] rounded-3xl">
                                <Typography variant="chip" weight={500} lineHeight={20} className="text-[#d9f99d]">
                                    India's EV Charging Network
                                </Typography>
                            </div>

                            {/* Heading */}
                            <div className="flex flex-col gap-3">
                                <Typography
                                    variant="h1"
                                    weight={700}
                                    letterSpacing={0.01}
                                    className="text-[#0A0A0A]"
                                >
                                    Smart EV Charging,{" "}
                                    <span className="text-[#365314]">Right Where You Are.</span>
                                </Typography>
                                <Typography
                                    variant="body"
                                    weight={400}
                                    lineHeight={isMd ? 28 : 24}
                                    className="text-black-700 max-w-md"
                                >
                                    EvSetu connects <b>EV Drivers and Charger Hosts</b> with verified,
                                    private EV charging points nearby. No more range anxiety. Save time
                                    and power.
                                </Typography>
                            </div>

                            {/* Feature Chips */}
                            <div className="flex flex-wrap gap-2.5">
                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Verified />
                                    <Typography variant="chip" weight={600} lineHeight={20} className="text-[#1a2e05]">
                                        Verified Spots
                                    </Typography>
                                </div>
                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Guaranteed />
                                    <Typography variant="chip" weight={600} lineHeight={20} className="text-[#1a2e05]">
                                        Guaranteed Charging
                                    </Typography>
                                </div>
                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Effortless />
                                    <Typography variant="chip" weight={600} lineHeight={20} className="text-[#1a2e05]">
                                        Effortless Earnings
                                    </Typography>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <div className="w-full sm:w-auto">
                                    <Link href="/signup?role=host">
                                        <Button
                                            text="Join as Host"
                                            variant="lg"
                                            bg="#365314"
                                            color="#FFFFFF"
                                            hoverBg="#101010"
                                            boxShadow="1px 2px 24px 0px #13245733"
                                            className="w-full"
                                        />
                                    </Link>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <Link href="/signup?role=driver">
                                        <Button
                                            text="Join as Driver"
                                            variant="lg"
                                            bg="#d9f99d"
                                            color="#1a2e05"
                                            hoverBg="#bef264"
                                            className="w-full"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Login */}
                            <Typography variant="para" className="text-black-600">
                                Already have an account?{" "}
                                <Link href="/login" className="text-[#2C7FFF] hover:underline font-semibold">
                                    Login here
                                </Link>
                            </Typography>
                        </div>

                        {/* Right — Animated Flow Component */}
                        <div className="flex-1 w-full lg:max-w-lg">
                            <div className="flex flex-col gap-3">

                                {/* Two cards + connector row */}
                                <div className="flex items-stretch gap-3">

                                    {/* Host Card */}
                                    <div className="flex-1 bg-white border border-[#d9f99d] rounded-2xl p-4 flex flex-col gap-3">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-[#365314] flex items-center justify-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9f99d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium text-[#0A0A0A] leading-none">Host</p>
                                                <p className="text-[11px] text-black-500 mt-0.5">Charger owner</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1.5 bg-[#d9f99d] rounded-2xl py-1 px-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#365314] animate-pulse" />
                                                <span className="text-[10px] font-medium text-[#365314]">Active</span>
                                            </div>
                                        </div>

                                        {/* Steps */}
                                        <div className="flex flex-col divide-y divide-[#f0fdf4]">
                                            {[
                                                { n: "1", title: "List your charger", sub: "Add details & photos" },
                                                { n: "2", title: "Set availability & price", sub: "Hours & rate per hour" },
                                                { n: "3", title: "Accept & earn", sub: "Auto-confirm, get paid", dark: true },
                                            ].map((s) => (
                                                <div key={s.n} className="flex items-start gap-2.5 py-2">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 mt-0.5 ${s.dark ? "bg-[#365314] text-[#d9f99d]" : "bg-[#d9f99d] text-[#365314]"}`}>
                                                        {s.n}
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-medium text-[#0A0A0A] leading-tight">{s.title}</p>
                                                        <p className="text-[11px] text-black-500 leading-tight mt-0.5">{s.sub}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Earnings Tag */}
                                        <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-3 py-2">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                            </svg>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#1a4719] leading-none">₹340 earned today</p>
                                                <p className="text-[10px] text-[#4d7c0f] mt-0.5">3 sessions completed</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Connector */}
                                    <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-12">
                                        {/* Animated paths SVG */}
                                        <svg width="48" height="80" viewBox="0 0 48 80" className="overflow-visible">
                                            <defs>
                                                <path id="p1" d="M 4,10 C 16,10 32,70 44,70" />
                                                <path id="p2" d="M 44,10 C 32,10 16,70 4,70" />
                                            </defs>
                                            <path d="M 4,10 C 16,10 32,70 44,70" stroke="#65a30d" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.45" />
                                            <path d="M 44,10 C 32,10 16,70 4,70" stroke="#365314" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.45" />
                                            <circle r="4" fill="#65a30d">
                                                <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
                                                    <mpath href="#p1" />
                                                </animateMotion>
                                            </circle>
                                            <circle r="4" fill="#bef264" stroke="#365314" strokeWidth="1">
                                                <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                                                    <mpath href="#p2" />
                                                </animateMotion>
                                            </circle>
                                        </svg>

                                        {/* Center Logo Badge */}
                                        <div className="relative w-10 h-10 rounded-full bg-[#365314] flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full border-2 border-[#65a30d] animate-ping opacity-30" />
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#bef264" />
                                            </svg>
                                        </div>

                                        <p className="text-[9px] text-black-400 text-center leading-tight">live<br />sync</p>
                                    </div>

                                    {/* Driver Card */}
                                    <div className="flex-1 bg-white border border-[#bfdbfe] rounded-2xl p-4 flex flex-col gap-3">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-[#bef264] flex items-center justify-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2e05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 4v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium text-[#0A0A0A] leading-none">Driver</p>
                                                <p className="text-[11px] text-black-500 mt-0.5">EV owner</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1.5 bg-[#dbeafe] rounded-2xl py-1 px-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                                                <span className="text-[10px] font-medium text-[#1e40af]">Nearby</span>
                                            </div>
                                        </div>

                                        {/* Steps */}
                                        <div className="flex flex-col divide-y divide-[#eff6ff]">
                                            {[
                                                { n: "1", title: "Find nearby chargers", sub: "Live map, verified spots" },
                                                { n: "2", title: "Book your slot", sub: "Pick time, pay per hour" },
                                                { n: "3", title: "Plug in & charge", sub: "Navigate, arrive, charge", dark: true },
                                            ].map((s) => (
                                                <div key={s.n} className="flex items-start gap-2.5 py-2">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 mt-0.5 ${s.dark ? "bg-[#1e40af] text-white" : "bg-[#dbeafe] text-[#1e40af]"}`}>
                                                        {s.n}
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-medium text-[#0A0A0A] leading-tight">{s.title}</p>
                                                        <p className="text-[11px] text-black-500 leading-tight mt-0.5">{s.sub}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Booking Tag */}
                                        <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-3 py-2">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                                            </svg>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#1e3a8a] leading-none">Booked · 2 hrs · ₹180</p>
                                                <p className="text-[10px] text-[#3b82f6] mt-0.5">Charging in 12 min</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom trust bar */}
                                <div className="flex items-center justify-center gap-1.5 bg-white border border-[#e5e7eb] rounded-2xl py-2.5 px-4">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <p className="text-[11px] text-black-500">
                                        All chargers verified · Payments secured · Real-time sync
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-15">
                <Container>
                    <div className="flex flex-col gap-12 md:gap-16 pt-8 pb-11 md:py-17.5">
                        {/* Header */}
                        <div className="flex flex-col justify-between lg:flex-row gap-4 lg:items-end">
                            <div className="flex flex-col gap-1 md:gap-2">
                                <div className="w-max py-1.5 px-3 bg-[#d9f99d] backdrop-blur-sm rounded-3xl">
                                    <Typography variant="chip" weight={500} lineHeight={isMd ? 20 : 16} className="text-[#1a2e05]">
                                        HOW IT WORKS?
                                    </Typography>
                                </div>
                                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-[#0A0A0A]">
                                    Charging Made Simple for Everyone
                                </Typography>
                            </div>

                            {/* Toggle */}
                            <div className="flex gap-1 py-1.5 px-2 md:px-2 md:py-2 rounded-lg bg-[#EFEFEF] w-full md:w-auto">
                                {(["Driver", "Host"] as const).map((role) => (
                                    <div
                                        key={role}
                                        onClick={() => setActiveRole(role)}
                                        className={`flex items-center justify-center py-1.5 md:py-2 w-full px-4 rounded-lg cursor-pointer transition-colors duration-200 ${activeRole === role ? "bg-black" : ""
                                            }`}
                                    >
                                        <Typography
                                            variant="chip"
                                            weight={400}
                                            lineHeight={isMd ? 20 : 16}
                                            className={activeRole === role ? "text-black-00" : "text-black"}
                                        >
                                            {role}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Snake Timeline */}
                        <HowItWorksSnake data={data} activeRole={activeRole} />

                    </div>
                </Container>
            </section>

            {/* Our Happy Customers */}
            <section className="bg-[#f0fdf4] overflow-hidden">
                <Container>
                    <div className="pt-4 md:pt-8 pb-8 md:pb-17.5">
                        <div className="flex flex-col gap-6 md:gap-10">

                            {/* Header */}
                            <div className="flex flex-col gap-2 items-center">
                                <div className="w-max py-1.5 px-3 bg-[#d9f99d] backdrop-blur-sm rounded-3xl">
                                    <Typography variant="chip" weight={500} lineHeight={isMd ? 20 : 16} className="text-[#1a2e05]">
                                        TESTIMONIALS
                                    </Typography>
                                </div>
                                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-[#0A0A0A]">
                                    Trusted by EV Drivers & Hosts
                                </Typography>
                            </div>

                            {/* Book */}
                            <TestimonialsBook />

                            {/* Rating row — identical to original */}
                            <div className="flex gap-8 justify-center">
                                <div className="hidden lg:flex items-center w-full">
                                    <div className="border-2 border-solid border-[#365314] w-full h-px" />
                                </div>
                                <div className="flex gap-3 items-center">
                                    <AvatarGroup images={["/e.png", "/d.png", "/c.png", "/b.png", "/a.png"]} />
                                    <div className="flex flex-col">
                                        <div className="flex gap-2 items-center">
                                            <RatingStars />
                                            <Typography variant="para" weight={600} lineHeight={isMd ? 24 : 20} className="text-[#132457]">
                                                4.9 / 5
                                            </Typography>
                                        </div>
                                        <Typography variant="body" weight={400} lineHeight={isMd ? 24 : 20} className="text-black-900 whitespace-nowrap">
                                            Based on 3,000+ reviews
                                        </Typography>
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center w-full">
                                    <div className="border-2 border-solid border-[#365314] w-full h-px" />
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>



            {/* Key Features */}
            <section id="features-view" className="bg-[#ecfccb] scroll-mt-10">
                <Container pl="pl-6" pr="pr-0">
                    <div className="feature-content pt-8 md:pt-17.5 flex flex-col gap-8 md:gap-15 ">
                        <div className="flex flex-col gap-2 lg:gap-3 items-center pr-6 md:pr-0">
                            <div className="flex flex-col gap-1 lg:gap-2 items-center ">
                                <div className="w-max py-1.5 px-3 bg-[#d9f99d] backdrop-blur-sm rounded-3xl">
                                    <Typography
                                        variant="chip"
                                        weight={600}
                                        lineHeight={isMd ? 20 : 16}
                                        className="text-[#1a2e05]"
                                    >
                                        KEY FEATURES
                                    </Typography>
                                </div>

                                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900 text-center">
                                    Smart. Verified. Effortless.
                                </Typography>
                            </div>
                            <Typography variant="body" lineHeight={isMd ? 32 : 20} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
                                A platform built to make EV charging safer, simpler, and smarter for everyone.
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-10 lg:gap-12.5 ">
                            <div className="flex flex-col gap-8 lg:flex-row justify-center ">
                                <div className="hidden xl:flex gap-8">
                                    <div className="flex flex-col gap-9">
                                        <FeatureCard
                                            mainIcon={realtime}
                                            mainIconAlt="realtime map"
                                            title="Real-Time Charging point Maps"
                                            subtitle="Find available EV chargers instantly with our live, dynamic map interface."
                                            chipText="Live Updates"
                                            chipIcon={undefined}
                                            chipIconBg={true}
                                        />

                                        <FeatureCard
                                            mainIcon={arrow}
                                            mainIconAlt="arrow"
                                            title="Simple Booking & Management"
                                            subtitle="Book, manage, or cancel charging sessions easily in just a few taps."
                                            chipText="3 Simple Steps"
                                            chipIcon={dots}
                                            chipIconAlt="dots"
                                            chipIconBg={false}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-9">
                                        <FeatureCard
                                            mainIcon={verified}
                                            mainIconAlt="verified"
                                            title="Verified Secure Chargers"
                                            subtitle="All charging points are verified to ensure safe, reliable charging always."
                                            chipText="100% Verified Hosts"
                                            chipIcon={tick}
                                            chipIconAlt="tick"
                                            chipIconBg={true}
                                        />

                                        <FeatureCard
                                            mainIcon={calender}
                                            mainIconAlt="calendar"
                                            title="Event-Friendly Charger Discovery"
                                            subtitle="Find chargers near you and compare distance, reviews, and availability."
                                            chipText="Event Optimized"
                                            chipIcon={star}
                                            chipIconAlt="star"
                                            chipIconBg={true}
                                        />
                                    </div>
                                </div>



                                <div className="flex flex-col gap-4 xl:hidden overflow-hidden justify-end">
                                    <Swiper
                                        modules={[Pagination]}
                                        spaceBetween={12}
                                        slidesPerView={1.1} // This will show 1.1 cards
                                        loop={true}
                                        pagination={{
                                            clickable: true,
                                            el: '.custom-pagination',
                                        }}
                                        className="w-full"
                                        breakpoints={{
                                            // Mobile - shows 1.1 cards
                                            0: {
                                                slidesPerView: 1.1,
                                                spaceBetween: 12,
                                            },
                                            // Small tablets - shows 1.5 cards
                                            640: {
                                                slidesPerView: 1.5,
                                                spaceBetween: 16,
                                            },
                                            // Medium tablets - shows 2 cards
                                            768: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            // Large tablets/laptops - shows 3 cards
                                            1024: {
                                                slidesPerView: 3,
                                                spaceBetween: 24,
                                            },
                                        }}
                                    >
                                        {slides.map((slide, idx) => (
                                            <SwiperSlide key={idx} style={{ listStyle: "none" }}>
                                                <div className="w-full">
                                                    <FeatureCard {...slide} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <div className="custom-pagination flex justify-center gap-2"></div>
                                </div>
                                <div className="w-full max-w-100 mr-6">
                                    <div className="flex justify-center relative w-full h-full min-h-126.5 md:min-h-112.5 ">
                                        <Image
                                            src={car}
                                            alt="car"
                                            fill
                                            className="object-contain"
                                            sizes="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 lg:gap-5 items-center justify-center pr-6">
                                <h4 className="font-semibold text-[20px] leading-8 md:text-[30px] md:leading-[37.5px] tracking-[1%] text-center text-black-900">
                                    Find your next charging station the smarter way.
                                </h4>
                                <div className="d-flex w-full lg:w-auto cursor-pointer">
                                    <Link href="/signup">
                                        <Button
                                            text="Get Started Now"
                                            variant="lg"
                                            bg="#365314"
                                            color="#FFFFFF"
                                            hoverBg="#101010"
                                            boxShadow="1px 2px 24px 0px #13245733"
                                            className="w-full"
                                        />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>


            {/* design */}
            <div className="overflow-hidden ">
                <BackgroundWave fillColor="#ecfccb" />
            </div>



            {/* car design */}
            {/* <section className="overflow-hidden ">
                <div className="hidden xl:flex">
                    <Container>
                        <AnimatedCarSection />
                    </Container>
                </div>
                <div className="flex xl:hidden">
                    <Container>
                        <div className="flex relative w-full h-full min-h-30.5 ">
                            <Image
                                src={parkedCar}
                                alt="parkedCar"
                                fill
                                className="object-contain"
                                sizes="100%"
                            />
                        </div>
                    </Container>
                </div>
            </section> */}
            {/* FAQ */}
            <section id="faq-view" className="scroll-mt-10">
                <Container>
                    <div className="flex flex-col gap-8 md:gap-12.5 items-center py-8 md:py-17.5 ">
                        <div className="flex flex-col gap-1 md:gap-2 items-center">
                            <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900">
                                Frequently Asked Questions
                            </Typography>
                            <Typography variant="body" lineHeight={isMd ? 32 : 22} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
                                Have questions about EV charging? Contact our support team via email — we’ll respond quickly.
                            </Typography>
                        </div>

                        <div className="flex gap-5 xl:gap-22.5 items-start h-full w-full ">
                            <div className="hidden md:flex flex-col gap-6 w-[80%] sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
                                <FaqCar />
                                <div className="">
                                    <Button
                                        text={showAll ? "View Less" : "View More Questions"}
                                        variant="lg"
                                        bg="#365314"
                                        color="#FFFFFF"
                                        hoverBg="#101010"
                                        boxShadow="1px 2px 24px 0px #13245733"
                                        onClick={handleToggleFaqs}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 max-w-141 ">
                                <FaqList showCount={showAll ? undefined : initialCount} />
                                <div className="flex justify-center md:hidden">
                                    <Button
                                        text={showAll ? "View Less" : "View More Questions"}
                                        variant="lg"
                                        bg="#365314"
                                        color="#FFFFFF"
                                        hoverBg="#101010"
                                        boxShadow="1px 2px 24px 0px #13245733"
                                        onClick={handleToggleFaqs}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
};

export default WaitlistPage;