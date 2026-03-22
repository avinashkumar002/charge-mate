"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";

import glass from "@/assets/svgs/glass.svg";
import book from "@/assets/svgs/book.svg";
import paid from "@/assets/svgs/paid.svg";
import glassHost from "@/assets/svgs/glass-host.svg";
import bookHost from "@/assets/svgs/book-host.svg";
import paidHost from "@/assets/svgs/paid-host.svg";

const stepsData = {
  driver: [
    {
      number: "01",
      icon: glass,
      title: "Find Nearby Chargers",
      description:
        "Open the app, share your location, and instantly discover verified EV chargers within minutes of where you are. Filter by type, price, and power output.",
      accent: "#365314",
    },
    {
      number: "02",
      icon: book,
      title: "Book Your Slot",
      description:
        "Browse available time slots, compare pricing across chargers, and reserve your preferred spot — all in just a few taps. No phone calls, no hassle.",
      accent: "#65a30d",
    },
    {
      number: "03",
      icon: paid,
      title: "Charge with Confidence",
      description:
        "Get turn-by-turn directions to your booked charger, plug in, and enjoy a guaranteed stress-free charging session. Track your booking status in real time.",
      accent: "#84cc16",
    },
  ],
  host: [
    {
      number: "01",
      icon: glassHost,
      title: "List Your Charger",
      description:
        "Add your home or private EV charger in under a minute. Upload photos, pin your location on the map, and specify your charger type and power output.",
      accent: "#365314",
    },
    {
      number: "02",
      icon: bookHost,
      title: "Set Availability & Pricing",
      description:
        "Choose your available hours and set a fair hourly rate. You're always in full control — update your schedule or pricing anytime.",
      accent: "#65a30d",
    },
    {
      number: "03",
      icon: paidHost,
      title: "Host & Earn",
      description:
        "Receive booking requests from verified drivers, accept or decline with one tap, and earn passive income from every charging session.",
      accent: "#84cc16",
    },
  ],
};

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<"driver" | "host">("driver");
  const steps = stepsData[activeRole];

  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                HOW IT WORKS
              </Typography>
            </div>
            <Typography variant="h1" weight={700} className="text-black-900 mb-4">
              Three Simple Steps to{" "}
              <span className="text-[#365314]">Smarter Charging</span>
            </Typography>
            <Typography variant="body" className="text-black-600 max-w-2xl mx-auto">
              Whether you&apos;re a driver looking for a reliable charge or a host ready
              to earn, EVSetu makes the entire process effortless.
            </Typography>
          </AnimateOnScroll>

          {/* Role Toggle */}
          <AnimateOnScroll animation="fadeInUp" delay={0.15} className="flex justify-center mb-16">
            <div className="flex gap-1 p-1.5 rounded-xl bg-[#F0F0F0]">
              {(
                [
                  { key: "driver", label: "  For Drivers" },
                  { key: "host", label: "  For Hosts" },
                ] as const
              ).map((role) => (
                <button
                  key={role.key}
                  onClick={() => setActiveRole(role.key)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeRole === role.key
                      ? "bg-[#365314] text-white shadow-lg shadow-[#365314]/20"
                      : "text-black-600 hover:text-black-900"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => (
              <AnimateOnScroll
                key={`${activeRole}-${step.number}`}
                animation="fadeInUp"
                delay={0.15 * (index + 1)}
              >
                <div className="relative bg-white rounded-2xl p-8 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
                  {/* Step Number */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: step.accent }}
                  >
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="relative w-12 h-12 mb-5">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>

                  {/* Content */}
                  <Typography variant="h4" weight={600} className="text-black-900 mb-3">
                    {step.title}
                  </Typography>
                  <Typography variant="para" className="text-black-600 leading-relaxed flex-1">
                    {step.description}
                  </Typography>

                  {/* Connector Arrow — desktop only, not on last card */}
                  {index < 2 && (
                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-10 h-10 rounded-full bg-[#d9f99d] flex items-center justify-center shadow-md">
                        <span className="text-[#365314] text-lg">→</span>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* How it connects section */}
          <AnimateOnScroll animation="fadeInUp" className="mb-20">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-3">⚡</div>
                  <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                    Instant Matching
                  </Typography>
                  <Typography variant="para" className="text-black-600">
                    GPS-based search finds the nearest available chargers in seconds
                  </Typography>
                </div>
                <div>
                  <div className="text-4xl mb-3">🔔</div>
                  <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                    Real-Time Updates
                  </Typography>
                  <Typography variant="para" className="text-black-600">
                    Hosts and drivers get instant notifications on booking status changes
                  </Typography>
                </div>
                <div>
                  <div className="text-4xl mb-3">🛡️</div>
                  <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                    Secure & Verified
                  </Typography>
                  <Typography variant="para" className="text-black-600">
                    All chargers are verified with photos, specs, and host details
                  </Typography>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* CTA */}
          <AnimateOnScroll animation="scaleIn">
            <div className="bg-[#365314] rounded-3xl p-10 md:p-16 text-center">
              <Typography variant="h2" weight={600} className="text-white mb-4">
                Ready to Get Started?
              </Typography>
              <Typography variant="body" className="text-[#d9f99d] mb-8 max-w-lg mx-auto">
                Join thousands of EV drivers and hosts already using EVSetu for
                smarter, simpler charging.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup?role=driver">
                  <Button
                    text="Join as Driver"
                    bg="#d9f99d"
                    color="#365314"
                    hoverBg="#bef264"
                    variant="lg"
                    className="w-full sm:w-auto"
                  />
                </Link>
                <Link href="/signup?role=host">
                  <Button
                    text="Join as Host"
                    bg="transparent"
                    color="#FFFFFF"
                    hoverBg="rgba(255,255,255,0.1)"
                    variant="lg"
                    boxShadow="inset 0 0 0 1.5px #FFFFFF"
                    className="w-full sm:w-auto"
                  />
                </Link>
              </div>
              <Typography variant="chip" className="text-white/60 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-[#d9f99d] hover:underline">
                  Login here
                </Link>
              </Typography>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}