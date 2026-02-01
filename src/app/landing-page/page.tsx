"use client";
import Typography from "@/components/Typography/Typography";
import Container from "@/components/Container/Container";

import Button from "@/components/Button/Button";
import Verified from "@/assets/svgs/Verified";
import Guaranteed from "@/assets/svgs/Guaranteed";
import Effortless from "@/assets/svgs/Effortless";
import EffortCard from "@/components/molecules/EffortCard";

import glass from "@/assets/svgs/glass.svg"
import book from "@/assets/svgs/book.svg"
import paid from "@/assets/svgs/paid.svg"
import glassHost from "@/assets/svgs/glass-host.svg";
import bookHost from "@/assets/svgs/book-host.svg";
import paidHost from "@/assets/svgs/paid-host.svg";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import Image from "next/image";
import FeatureCard from "@/components/molecules/FeatureCards";

import realtime from "@/assets/svgs/real-time.svg"
import tick from "@/assets/svgs/tick.svg"
import verified from "@/assets/svgs/verifid.svg"
import arrow from "@/assets/svgs/arrow.svg"
import calender from "@/assets/svgs/calender.svg"
import dots from "@/assets/svgs/dots.svg"
import star from "@/assets/svgs/star.svg"
import Rotatedcar from "@/assets/svgs/feat-car.svg"
import Car from "@/assets/svgs/waitlist-car.svg"
import BackgroundWave from "@/assets/svgs/BackgroundWave";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import PlayStore from "@/assets/svgs/PlayStore";
import QrCode from "@/assets/svgs/QrCode";
import AppStore from "@/assets/svgs/AppStore";
// import MobileUp from "@/assets/svgs/MobileUp";
import Up from "@/assets/images/MobileUp.png"
import Down from "@/assets/images/mobileDown.png"
import Mob from "@/assets/images/mob.svg"
import Link from "next/link";
import FaqCar from "@/assets/svgs/FaqCar";
import FaqList from "@/components/molecules/Faq/FaqList";

import parkedCar from "@/assets/svgs/parked-car.svg"
import AnimatedCarSection from "@/components/molecules/AnimatedCarSection";

import TestimonialCard from "@/components/molecules/TestimonialCard";
import AvatarGroup from "@/components/molecules/AvatarGroup";
import RatingStars from "@/assets/svgs/RatingStars";


export default function Home() {
  const isMd = useMediaQuery('(min-width: 768px)');
  const [activeRole, setActiveRole] = useState<"Driver" | "Host">("Driver");
  const data = {
    Driver: [
      {
        number: "01",
        bgColor: "#173EB6",
        icon: glass,
        title: "Search Nearby Spots",
        subtitle: "Find verified parking near your destination in seconds.",
      },
      {
        number: "02",
        bgColor: "#1B62F5",
        icon: book,
        title: "Pick & Reserve",
        subtitle: "Compare options and confirm your spot instantly.",
      },
      {
        number: "03",
        bgColor: "#2C7FFF",
        icon: paid,
        title: "Get Paid or Park Stress Free",
        subtitle: <>Navigate, arrive, and enjoy <span className="text-blue-500">stress-free parking.</span></>,
      },
    ],
    Host: [
      {
        number: "01",
        bgColor: "#173EB6",
        icon: glassHost,
        title: "List Your Space",
        subtitle: "Add your driveway or lot with quick details and photos.",
      },
      {
        number: "02",
        bgColor: "#1B62F5",
        icon: bookHost,
        title: "Set Availability & Price",
        subtitle: "Control when and how much you rent it for.",
      },
      {
        number: "03",
        bgColor: "#2C7FFF",
        icon: paidHost,
        title: "Go Live & Earn",
        subtitle: <>Accept bookings and<span className="text-blue-500"> start earning effortlessly.</span></>,
      },
    ],
  };

  const slides = [
    {
      mainIcon: realtime,
      mainIconAlt: "realtime map",
      title: "Real-Time Smart Map",
      subtitle: "Discover and reserve available spots instantly with our live, map-based interface that updates dynamically.",
      chipText: "Live Updates",
      chipIcon: undefined,
      chipIconBg: true,
    },
    {
      mainIcon: arrow,
      mainIconAlt: "arrow",
      title: "Effortless Booking & Management",
      subtitle: "Book, manage, or cancel with ease — from search to confirmation, everything happens in just a few taps.",
      chipText: "3 Simple Steps",
      chipIcon: dots,
      chipIconBg: false,
    },
    {
      mainIcon: verified,
      mainIconAlt: "verified",
      title: "Verified & Secure Parking",
      subtitle: "All listings are verified, ensuring your car is safely parked with trusted hosts.",
      chipText: "100% Verified Hosts",
      chipIcon: tick,
      chipIconBg: true,
    },
    {
      mainIcon: calender,
      mainIconAlt: "calendar",
      title: "Event-Ready Parking Discovery",
      subtitle: "Find parking near concerts, stadiums, or festivals — compare distances, reviews, and prices before you go.",
      chipText: "Event Optimized",
      chipIcon: star,
      chipIconBg: true,
    },
  ];
  const items = [
    {
      id: 1,
      stars: 5,
      title: "“Guaranteed Parking, Stress-Free Commute.”",
      comment:
        "Finding parking downtown was a headache. ChargeMate changed that. I pre-book a spot near my office every morning, saving time and stress. It's a game-changer for my commute.",
      author: "– Sarah M., Daily Commuter",
    },
    {
      id: 2,
      stars: 4,
      title: "“Hassle-Free Event Access, Secure & Close Parking.”",
      comment:
        "Concerts used to mean parking far away. With ChargeMate, I found a space two blocks from the venue. I pre-booked it, and arrival was seamless with the digital pass. It took the hassle out of event day, letting us enjoy the show, knowing our car was secure.",
      author: "– Mark K., Festival Attendee",
    },
    {
      id: 3,
      stars: 5,
      title: "“Effortless Earnings, Secure Hosting.”",
      comment:
        "The app shows real-time availability, and the digital pass makes entry super quick. Parking has never been easier.",
      author: "– Daniel P., Tech Conference Attendee",
    },
    {
      id: 4,
      stars: 5,
      title: "Quick and Easy Parking for Festivals.",
      comment:
        "Be was hassle-free. Highly recommended for festival-goers.",
      author: "– Emily R., Music Festival Attendee",
    },
    {
      id: 5,
      stars: 4,
      title: "Convenient Parking Near the Venue.",
      comment:
        "I always use",
      author: "– James L., Concert Goer",
    },
    {
      id: 6,
      stars: 5,
      title: "Stress-Free Event Days!",
      comment:
        "ChargeMate takes all the stress out of parking. I can focus on enjoying the event knowing my car is safe and close by.The app shows real-time availability, and the digital pass makes entry super quick. Parking has never been easier.",
      author: "– Olivia T., Attendee",
    },
  ];


  const [showAll, setShowAll] = useState(false);
  const initialCount = 5;
  // Toggle function
  const handleToggleFaqs = () => {
    setShowAll(prev => !prev);
  };


  return (
    <>
      {/* herosection */}
      <section className="relative bg-[url('/find-bg.svg')] md:bg-[url('/landing-bg.svg')]  bg-cover bg-center bg-no-repeat">
        <Container>
          <div className="flex flex-col gap-6 md:gap-8 py-8 md:py-[84px] max-w-[600px] mx-auto ">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col gap-2 md:gap-4">
                <Typography variant="h1" weight={700} letterSpacing={0.01} className="text-black-900 text-center ">
                  Find Smart, Secure Parking — Anytime,<span className="text-blue-500"> Anywhere.</span>
                </Typography>
                <Typography variant="body" weight={400} className="text-black-900 text-center">
                  ChargeMate connects <b> Drivers, Hosts, and Event-Goers </b> with verified, private parking spaces nearby. Stop circling. Save time and money.
                </Typography>
              </div>
              <div className="flex gap-2.5 justify-center md:justify-start md:gap-6 flex-wrap">
                <div className="flex gap-2 items-center bg-[#EEF6FF] py-1.5 px-4 rounded-3xl ">
                  <Verified />
                  <Typography variant="chip" weight={600} lineHeight={20} className="text-blue-800">
                    Verified Spots
                  </Typography>
                </div>
                <div className="flex gap-2 items-center bg-[#EEF6FF] py-1.5 px-4 rounded-3xl ">
                  <Guaranteed />
                  <Typography variant="chip" weight={600} lineHeight={20} className="text-blue-800">
                    Guaranteed Parking
                  </Typography>
                </div>
                <div className="flex gap-2 items-center bg-[#EEF6FF] py-1.5 px-4 rounded-3xl ">
                  <Effortless />
                  <Typography variant="chip" weight={600} lineHeight={20} className="text-blue-800">
                    Effortless Earnings
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-center">
              <div className="w-full md:w-auto">
                <Button
                  text="Register as Host & Earn"
                  variant="lg"
                  bg="#2C7FFF"
                  color="#FFFFFF"
                  hoverBg="#101010"
                  boxShadow="1px 2px 24px 0px #13245733"
                  className="w-full md:w-auto"
                />
              </div>
              <div className="w-full md:w-auto">
                <Button
                  text="Find Parking"
                  variant="lg"
                  bg="#2C7FFF1A"
                  color="#1B62F5"
                  hoverBg="#2C7FFF1A"
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ChargeMate Makes Parking Effortless */}
      <section id="how-it-works" className="scroll-mt-15">
        <Container>
          <div className="flex flex-col gap-[52px] md:gap-15 pt-8 pb-11 md:py-[70px] ">
            {/* Header */}
            <div className="flex flex-col justify-between lg:flex-row gap-2 lg:items-end">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="w-max py-1.5 px-3 bg-[#D9EBFF] backdrop-blur-sm rounded-3xl">
                  <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
                    HOW IT WORKS?
                  </Typography>
                </div>
                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-[#0A0A0A]">
                  ChargeMate Makes Parking Effortless
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

      {/* KEY FEATURES */}
      <section id="features-view" className="bg-[#F9F9F9] scroll-mt-10">
        <Container pl="pl-6" pr="pr-0">
          <div className="feature-content pt-8 md:pt-[70px] flex flex-col gap-8 md:gap-15 ">
            <div className="flex flex-col gap-2 lg:gap-3 items-center pr-6 md:pr-0">
              <div className="flex flex-col gap-1 lg:gap-2  items-center ">
                <div className="w-max py-1.5 px-3 bg-[#C5E3FF] backdrop-blur-sm rounded-3xl">
                  <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
                    KEY FEATURES
                  </Typography>
                </div>
                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900 text-center">
                  Smart. Verified. Effortless.
                </Typography>
              </div>
              <Typography variant="body" lineHeight={isMd ? 32 : 20} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
                A platform built to make parking safer, simpler, and smarter for everyone.
              </Typography>
            </div>
            <div className="flex flex-col gap-10 lg:gap-[50px] ">
              <div className="flex flex-col gap-8 lg:flex-row justify-center ">
                <div className="hidden xl:flex gap-8">
                  <div className="flex flex-col gap-9">
                    <FeatureCard
                      mainIcon={realtime}
                      mainIconAlt="realtime map"
                      title="Real-Time Smart Map"
                      subtitle="Discover and reserve available spots instantly with our live, map-based interface that updates dynamically."
                      chipText="Live Updates"
                      chipIcon={undefined}
                      chipIconBg={true}
                    />
                    <FeatureCard
                      mainIcon={arrow}
                      mainIconAlt="arrow"
                      title="Effortless Booking & Management"
                      subtitle="Book, manage, or cancel with ease — from search to confirmation, everything happens in just a few taps."
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
                      title="Verified & Secure Parking"
                      subtitle="Every listing is verified — giving you peace of mind that your car is parked safely with trusted hosts."
                      chipText="100% Verified Hosts"
                      chipIcon={tick}
                      chipIconAlt="tick"
                      chipIconBg={true}
                    />

                    <FeatureCard
                      mainIcon={calender}
                      mainIconAlt="calendar"
                      title="Event-Ready Parking Discovery"
                      subtitle="Find parking near concerts, stadiums, or festivals — compare distances, reviews, and prices before you go."
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
                      el: '.features-pagination',
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

                  <div className="features-pagination flex justify-center gap-2"></div>
                </div>
                <div className="hidden xl:flex w-full max-w-[400px] ">
                  <div className="flex justify-center relative w-full h-full min-h-[506px] md:min-h-[450px] ">
                    <Image
                      src={Car}
                      alt="car"
                      fill
                      className="object-contain"
                      sizes="100%"
                      priority
                    />
                  </div>
                </div>
                <div className="flex xl:hidden w-full max-w-[400px] pr-6">
                  <div className="flex justify-center relative w-full h-full min-h-[506px] md:min-h-[450px] ">
                    <Image
                      src={Rotatedcar}
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
                  Find your next parking spot the smarter way.
                </h4>
                <div className="flex gap-4 md:gap-6 w-full md:w-auto">
                  <div className="d-flex w-full lg:w-auto cursor-pointer">
                    <Button
                      text="Download App"
                      variant="lg"
                      bg="#2C7FFF"
                      color="#FFFFFF"
                      hoverBg="#101010"
                      boxShadow="1px 2px 24px 0px #13245733"
                      className="w-full"
                    />
                  </div>
                  <div className="d-flex w-full lg:w-auto cursor-pointer">
                    <Button
                      text="Become a Host"
                      variant="lg"
                      bg="#2C7FFF1A"
                      color="#2C7FFF"
                      hoverBg="#101010"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* design */}
      <div className="overflow-hidden bg-[#D9EBFF] ">
        <BackgroundWave fillColor="#F9F9F9" />
      </div>

      {/* Our Happy Customers */}
      <section className="bg-[#D9EBFF] overflow-hidden">
        <Container pl="pl-6" pr="pr-0">
          <div className="pt-4 md:pt-8 pb-8 md:pb-[70px] ">
            <div className="flex flex-col  gap-6 overflow-hidden">
              <div className="flex flex-col gap-2 items-center mr-6">
                <div className="w-max py-1.5 px-3 bg-[#C5E3FF] backdrop-blur-sm rounded-3xl">
                  <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
                    TESTIMONIALS
                  </Typography>
                </div>
                <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-[#0A0A0A]">
                  Our Happy Customers
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
                    delay: 3000,          // 3 seconds per slide
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    el: ".testimonials-pagination",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 12, centeredSlides: false },
                    640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16, centeredSlides: true },
                    768: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24, centeredSlides: true },
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
                  <div className="border-2 border-solid border-[#8EC7FF] w-full h-px">
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="">
                    <AvatarGroup
                      images={[
                        "/e.png",
                        "/d.png",
                        "/c.png",
                        "/b.png",
                        "/a.png",
                      ]}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <div className="">
                        <RatingStars />
                      </div>
                      <div className="">
                        <Typography variant="para" weight={600} lineHeight={isMd ? 24 : 20} className="text-[#132457]">
                          4.9 / 5
                        </Typography>
                      </div>
                    </div>
                    <div className="">
                      <Typography variant="body" weight={400} lineHeight={isMd ? 24 : 20} className="text-black-900 whitespace-nowrap">
                        Based on 2,169 reviews
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center w-full">
                  <div className="border-2 border-solid border-[#8EC7FF] w-full h-px">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* get the app */}
      <section className=" bg-[#000C29] overflow-hidden h-auto  xl:min-h-[542px] flex">
        <Container className="flex items-center">
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-20 pt-8 xl:pt-0">
            <div className="flex flex-col gap-6 xl:gap-10 justify-center ">
              <div className="flex flex-col gap-1 xl:gap-4 w-full xl:min-w-[468px]">
                <div className="w-max py-1.5 px-3 bg-[#19398F80] backdrop-blur-sm rounded-3xl">
                  <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-[#E7E7E7] ">
                    Download
                  </Typography>
                </div>
                <div className="flex flex-col gap-2 md:gap-4">
                  <Typography variant="h2" weight={700} lineHeight={isMd ? 45 : 36} className="text-[#FFFFFF] ">
                    Get the App. Park Smarter.
                  </Typography>
                  <Typography variant="body" weight={400} lineHeight={isMd ? 28 : 22} className="text-[#FFFFFF]">
                    Experience ChargeMate with Saved Places and mobile payments. Download the top app for verified parking.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-6 xl:gap-10">
                <Link href="/qr">
                  <QrCode />
                </Link>

                <div className="flex flex-col gap-6 justify-center">
                  <Link href="/playstore">
                    <PlayStore />
                  </Link>

                  <Link href="/appstore">
                    <AppStore />
                  </Link>
                </div>
              </div>
            </div>
            <div className="xl:flex gap-10 hidden">
              <div className="flex justify-end relative w-full h-full  min-w-[285px] mt-[62px] ">
                <Image
                  src={Up}
                  alt="Mobile"
                  fill
                  className="object-contain"
                  sizes="100%"
                  priority
                />
              </div>
              <div className="flex justify-end relative w-full h-full  min-w-[285px] -mt-16 ">
                <Image
                  src={Down}
                  alt="Mobile"
                  fill
                  className="object-contain"
                  sizes="100%"
                  priority
                />
              </div>
            </div>
            {/* <div className=""> */}
            <div className="flex justify-center relative w-full h-full  min-h-[270px]  ">
              <Image
                src={Mob}
                alt="Mobile"
                fill
                className="object-contain"
                sizes="100%"
                priority
              />
            </div>
            {/* </div> */}
          </div>
        </Container>
      </section>

      <section id="faq-view" className="scroll-mt-[100px]">
        <Container>
          <div className="flex flex-col gap-8 md:gap-[50px] items-center py-8 md:py-[70px] ">
            <div className="flex flex-col gap-1 md:gap-2 items-center">
              <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900">
                Frequently Asked Questions
              </Typography>
              <Typography variant="body" lineHeight={isMd ? 32 : 22} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
                For any unanswered questions, reach out to our support team via email. We&apos;ll respond as soon as possible to assist you.
              </Typography>
            </div>
            <div className="flex gap-5 xl:gap-[90px] items-start h-full w-full justify-center ">
              <div className="hidden md:flex flex-col gap-6 w-[80%] sticky top-20 max-h-[calc(100vh-5rem)]">
                <FaqCar />
                <div className="">
                  <Button
                    text={showAll ? "View Less" : "View More Questions"}
                    variant="lg"
                    bg="#2C7FFF"
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
                    bg="#2C7FFF"
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
  );
}