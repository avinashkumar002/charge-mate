"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";

import realtime from "@/assets/svgs/real-time.svg";
import arrow from "@/assets/svgs/arrow.svg";
import verified from "@/assets/svgs/verifid.svg";
import calender from "@/assets/svgs/calender.svg";

const features = [
  {
    icon: realtime,
    title: "Real-Time Charging Maps",
    description:
      "Discover available EV chargers near you with our live, interactive map. See charger status, distance from your location, and pricing — all at a glance.",
    badge: "Live Updates",
    badgeColor: "#ECF5FF",
    badgeText: "#2C7FFF",
  },
  {
    icon: verified,
    title: "Verified & Secure Chargers",
    description:
      "Every charger on EVSetu is verified with photos, specs, and host details. Charge with confidence knowing every listing is reviewed for safety and reliability.",
    badge: "100% Verified",
    badgeColor: "#f0fdf4",
    badgeText: "#365314",
  },
  {
    icon: arrow,
    title: "Simple Booking Flow",
    description:
      "Book a charging slot in 3 simple steps — select your charger, pick your time, and confirm. No phone calls, no complexity, no waiting.",
    badge: "3 Easy Steps",
    badgeColor: "#FFF7ED",
    badgeText: "#C2410C",
  },
  {
    icon: calender,
    title: "Flexible Scheduling",
    description:
      "Hosts set their own availability and pricing. Drivers book slots that fit their schedule. Manage, cancel, or reschedule bookings anytime with full control.",
    badge: "Full Control",
    badgeColor: "#F5F3FF",
    badgeText: "#7C3AED",
  },
];

const highlights = [
  {
    icon: "📍",
    title: "GPS-Powered Search",
    description: "Find chargers sorted by distance from your current location",
  },
  {
    icon: "🔔",
    title: "Instant Notifications",
    description: "Real-time alerts for booking confirmations and status changes",
  },
  {
    icon: "🗺️",
    title: "Directions Built-In",
    description: "Get turn-by-turn directions to any charger with one tap",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description: "See exact costs upfront — no hidden fees, no surprises",
  },
  {
    icon: "📸",
    title: "Photo Verified Listings",
    description: "Every charger listing includes real photos for trust and clarity",
  },
  {
    icon: "📊",
    title: "Host Dashboard",
    description: "Track earnings, manage bookings, and control availability in one place",
  },
];

const stats = [
  { value: "500+", label: "Active Chargers" },
  { value: "3,000+", label: "Happy Users" },
  { value: "10,000+", label: "Sessions Completed" },
  { value: "4.9/5", label: "Average Rating" },
];

export default function FeaturesPage() {
  return (
    <section className="min-h-screen pt-28 pb-20">
      {/* Hero — green background */}
      <div className="bg-[#ecfccb] pb-24">
        <Container>
          <AnimateOnScroll animation="fadeInUp" className="text-center max-w-3xl mx-auto pt-12">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                FEATURES
              </Typography>
            </div>
            <Typography variant="h1" weight={700} className="text-black-900 mb-4">
              Everything You Need for{" "}
              <span className="text-[#365314]">Smarter EV Charging</span>
            </Typography>
            <Typography variant="body" className="text-black-600">
              A platform designed with both drivers and hosts in mind. Simple,
              reliable, and built for the future of electric mobility.
            </Typography>
          </AnimateOnScroll>
        </Container>
      </div>

      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Feature Cards — overlapping the green section */}
          <div className="grid md:grid-cols-2 gap-6 -mt-16">
            {features.map((feature, index) => (
              <AnimateOnScroll
                key={feature.title}
                animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
                delay={0.12 * index}
              >
                <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
                  {/* Badge */}
                  <span
                    className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full mb-6"
                    style={{
                      backgroundColor: feature.badgeColor,
                      color: feature.badgeText,
                    }}
                  >
                    {feature.badge}
                  </span>

                  {/* Icon */}
                  <div className="relative w-14 h-14 mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>

                  {/* Content */}
                  <Typography variant="h4" weight={600} className="text-black-900 mb-3">
                    {feature.title}
                  </Typography>
                  <Typography variant="para" className="text-black-600 leading-relaxed flex-1">
                    {feature.description}
                  </Typography>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Stats Bar */}
          <AnimateOnScroll animation="fadeInUp" delay={0.2} className="mt-16">
            <div className="bg-[#365314] rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <Typography variant="h2" weight={700} className="text-[#d9f99d] mb-1">
                      {stat.value}
                    </Typography>
                    <Typography variant="chip" className="text-white/80">
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* More Highlights Grid */}
          <div className="mt-20">
            <AnimateOnScroll animation="fadeInUp" className="text-center mb-12">
              <Typography variant="h2" weight={600} className="text-black-900 mb-3">
                And There&apos;s More
              </Typography>
              <Typography variant="body" className="text-black-600 max-w-xl mx-auto">
                Every detail is designed to make EV charging seamless for
                drivers and profitable for hosts.
              </Typography>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <AnimateOnScroll
                  key={item.title}
                  animation="fadeInUp"
                  delay={0.1 * index}
                >
                  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-lg transition-all duration-500 group">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <Typography variant="para" weight={600} className="text-black-900 mb-2">
                      {item.title}
                    </Typography>
                    <Typography variant="chip" className="text-black-600">
                      {item.description}
                    </Typography>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* CTA */}
          <AnimateOnScroll animation="scaleIn" className="mt-20 text-center">
            <Typography variant="h3" weight={600} className="text-black-900 mb-3">
              Experience the future of EV charging
            </Typography>
            <Typography variant="para" className="text-black-600 mb-8">
              Join EVSetu today and discover a smarter way to charge.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup?role=driver">
                <Button
                  text="Get Started as Driver"
                  bg="#365314"
                  color="#FFFFFF"
                  hoverBg="#1a2e05"
                  variant="lg"
                  boxShadow="1px 2px 24px 0px #13245733"
                  className="w-full sm:w-auto"
                />
              </Link>
              <Link href="/signup?role=host">
                <Button
                  text="List Your Charger"
                  bg="#d9f99d"
                  color="#365314"
                  hoverBg="#bef264"
                  variant="lg"
                  className="w-full sm:w-auto"
                />
              </Link>
            </div>
            <Typography variant="chip" className="text-black-400 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2C7FFF] hover:underline">
                Login here
              </Link>
            </Typography>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}