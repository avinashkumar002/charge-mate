"use client";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import { FC, useState, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Button from "@/components/Button/Button";
import glass from "@/assets/svgs/glass.svg"
import book from "@/assets/svgs/book.svg"
import paid from "@/assets/svgs/paid.svg"
import car from "@/assets/svgs/feature-car.svg"
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

    const items = [
        {
            id: 1,
            stars: 5,
            title: "“Reliable Charging Right When I Needed It.”",
            comment:
                "I was low on battery and needed a charger near my office. I booked a nearby home charger in minutes. Smooth experience, clear directions, and no waiting time at all.",
            author: "– Sarah M., EV Driver",
        },
        {
            id: 2,
            stars: 5,
            title: "“Earning from My Home Charger Was Effortless.”",
            comment:
                "I had an EV charger sitting idle most of the day. Listing it as a host was simple, and now I earn passive income while helping other EV drivers charge conveniently.",
            author: "– Mark K., Charger Host",
        },
        {
            id: 3,
            stars: 4,
            title: "“Perfect for Long Trips and City Driving.”",
            comment:
                "Public charging stations are often crowded. Booking a private charger ahead of time gives me peace of mind, especially during long drives or busy days.",
            author: "– Daniel P., EV Owner",
        },
        {
            id: 4,
            stars: 5,
            title: "“Safe, Secure, and Well-Maintained Chargers.”",
            comment:
                "As a driver, I appreciate knowing exactly where I’m charging and what type of charger I’ll get. Every booking so far has been smooth and reliable.",
            author: "– Emily R., Daily EV Commuter",
        },
        {
            id: 5,
            stars: 4,
            title: "“Great Way to Support the EV Community.”",
            comment:
                "Hosting a charger feels good. I’m helping other EV users while covering my electricity costs and more. The platform handles everything.",
            author: "– James L., Home Charger Host",
        },
        {
            id: 6,
            stars: 5,
            title: "“No More Range Anxiety.”",
            comment:
                "Being able to book chargers in advance has completely changed how I plan my trips. Charging is predictable, affordable, and stress-free.",
            author: "– Olivia T., EV Road Tripper",
        },
    ];

    const initialCount = 5;
    const handleToggleFaqs = () => {
        setShowAll(prev => !prev);
    };

    return (
        <>
            <Suspense fallback={null}>
                <ScrollHandler />
            </Suspense>

            {/* Hero Section */}
            <section className="relative">
                <Container>
                    <div className="flex flex-col gap-6 md:gap-8 py-8 md:py-[84px] max-w-[600px] mx-auto ">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-col gap-2 md:gap-4">
                                <Typography variant="h1" weight={700} letterSpacing={0.01} className="text-black-900 text-center">
                                    Find Smart, Reliable EV Charging — Anytime, <span className="text-lime-900"> Anywhere.</span>
                                </Typography>
                                <Typography variant="body" weight={400} lineHeight={isMd ? 28 : 24} className="text-black-900 text-center">
                                    ChargeMate connects <b> EV Drivers and Charger Hosts</b> with verified, private EV charging points nearby. No more range anxiety. Save time and power.
                                </Typography>
                            </div>
                            <div className="flex gap-2.5 justify-center md:justify-start md:gap-6 flex-wrap">
                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Verified />
                                    <Typography
                                        variant="chip"
                                        weight={600}
                                        lineHeight={20}
                                        className="text-[#1a2e05]"
                                    >
                                        Verified Spots
                                    </Typography>
                                </div>
                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Guaranteed />
                                    <Typography
                                        variant="chip"
                                        weight={600}
                                        lineHeight={20}
                                        className="text-[#1a2e05]"
                                    >
                                        Guaranteed Parking
                                    </Typography>
                                </div>

                                <div className="flex gap-2 items-center bg-[#d9f99d] py-1.5 px-4 rounded-3xl">
                                    <Effortless />
                                    <Typography
                                        variant="chip"
                                        weight={600}
                                        lineHeight={20}
                                        className="text-[#1a2e05]"
                                    >
                                        Effortless Earnings
                                    </Typography>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-center">

                            <div className="w-full md:w-auto">
                                <Link href="/signup?role=host">
                                    <Button
                                        text="Join as Host"
                                        variant="lg"
                                        bg="#365314"
                                        color="#FFFFFF"
                                        hoverBg="#101010"
                                        boxShadow="1px 2px 24px 0px #13245733"
                                        className="w-full md:w-auto"
                                    />
                                </Link>
                            </div>

                            <div className="w-full md:w-auto">
                                <Link href="/signup?role=driver">
                                    <Button
                                        text="Join as Driver"
                                        variant="lg"
                                        bg="#d9f99d"
                                        color="#1a2e05"
                                        hoverBg="#bef264"
                                        className="w-full md:w-auto"
                                    />
                                </Link>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-15">
                <Container>
                    <div className="flex flex-col gap-13 md:gap-15 pt-8 pb-11 md:py-17.5 ">
                        {/* Header */}
                        <div className="flex flex-col justify-between lg:flex-row gap-2 lg:items-end">
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

                            {/* Toggle Buttons */}
                            <div className="flex gap-1 py-1.5 px-2 md:px-2 md:py-2 rounded-lg bg-[#EFEFEF] w-full md:w-auto">
                                {(["Driver", "Host"] as const).map((role) => (
                                    <div
                                        key={role}
                                        onClick={() => setActiveRole(role)}
                                        className={`flex items-center justify-center py-1.5 md:py-2 w-full px-4 rounded-lg cursor-pointer ${activeRole === role ? "bg-black" : ""
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

                        {/* Effort Cards    */}
                        <div className="flex flex-col lg:flex-row lg:justify-around gap-[42px] lg:gap-8 md:bg-[url('/bg-net.svg')] bg-none bg-contain md:bg-cover bg-center bg-no-repeat">
                            {data[activeRole].map((card) => (
                                <EffortCard
                                    key={card.number}
                                    number={card.number}
                                    bgColor={card.bgColor}
                                    icon={card.icon}
                                    title={card.title}
                                    subtitle={card.subtitle}
                                    animationKey={`${activeRole}-${card.number}`} // This triggers the animation
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Happy Customers */}
            <section className="bg-[#ecfccb] overflow-hidden">
                <Container pl="pl-6" pr="pr-0">
                    <div className="pt-4 md:pt-8 pb-8 md:pb-17.5 ">
                        <div className="flex flex-col gap-6 overflow-hidden">
                            <div className="flex flex-col gap-2 items-center mr-6">
                                <div className="w-max py-1.5 px-3 bg-[#d9f99d] backdrop-blur-sm rounded-3xl">
                                    <Typography variant="chip" weight={500} lineHeight={isMd ? 20 : 16} className="text-[#1a2e05]">
                                        TESTIMONIALS
                                    </Typography>
                                </div>
                                <Typography
                                    variant="h2"
                                    weight={600}
                                    lineHeight={isMd ? 45 : 36}
                                    className="text-[#0A0A0A]"
                                >
                                    Trusted by EV Drivers & Hosts
                                </Typography>
                            </div>

                            <div className="w-full mt-2 md:mt-9">
                                <Swiper
                                    className="testimonial-swiper overflow-visible!"
                                    modules={[Pagination, Autoplay]}
                                    slidesPerView={3}
                                    slidesPerGroup={1}
                                    centeredSlides={true}
                                    spaceBetween={30}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                        el: ".testimonials-pagination",
                                    }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1.2,
                                            slidesPerGroup: 1,
                                            spaceBetween: 12,
                                            centeredSlides: false,
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            slidesPerGroup: 1,
                                            spaceBetween: 16,
                                            centeredSlides: true,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            slidesPerGroup: 1,
                                            spaceBetween: 24,
                                            centeredSlides: true,
                                        },
                                    }}
                                >
                                    {items.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <div className="slide-inner flex justify-center">
                                                <TestimonialCard
                                                    stars={item.stars}
                                                    title={item.title}
                                                    comment={item.comment}
                                                    author={item.author}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="testimonials-pagination flex justify-center gap-2 mt-3 md:mt-8"></div>
                            </div>

                            <div className="flex gap-8 mr-6 justify-center">
                                <div className="hidden lg:flex items-center w-full">
                                    <div className="border-2 border-solid border-[#365314] w-full h-px"></div>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <AvatarGroup
                                        images={[
                                            "/e.png",
                                            "/d.png",
                                            "/c.png",
                                            "/b.png",
                                            "/a.png",
                                        ]}
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex gap-2 items-center">
                                            <RatingStars />
                                            <Typography
                                                variant="para"
                                                weight={600}
                                                lineHeight={isMd ? 24 : 20}
                                                className="text-[#132457]"
                                            >
                                                4.9 / 5
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant="body"
                                            weight={400}
                                            lineHeight={isMd ? 24 : 20}
                                            className="text-black-900 whitespace-nowrap"
                                        >
                                            Based on 3,000+ reviews
                                        </Typography>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center w-full">
                                    <div className="border-2 border-solid border-[#365314] w-full h-px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ */}
            <section id="faq-view" className="scroll-mt-10">
                <Container>
                    <div className="flex flex-col gap-8 md:gap-[50px] items-center py-8 md:py-[70px] ">
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
                            <div className="flex flex-col gap-6 max-w-[564px] ">
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
                                            priority
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
            <section className="overflow-hidden ">
                <div className="hidden xl:flex">
                    <Container>
                        <AnimatedCarSection />
                    </Container>
                </div>
                <div className="flex xl:hidden">
                    <Container>
                        <div className="flex relative w-full h-full min-h-[122px] ">
                            <Image
                                src={parkedCar}
                                alt="parkedCar"
                                fill
                                className="object-contain"
                                sizes="100%"
                                priority
                            />
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
};

export default WaitlistPage;