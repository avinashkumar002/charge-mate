"use client";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";

const safetyForDrivers = [
  {
    icon: "📸",
    title: "Photo-Verified Chargers",
    description:
      "Every charger listing requires a real photo uploaded by the host. You'll always know exactly what to expect before you arrive.",
  },
  {
    icon: "📍",
    title: "Exact Location on Map",
    description:
      "Hosts pin their charger's exact location using GPS. No guessing, no wrong addresses — navigate directly to the spot.",
  },
  {
    icon: "🔔",
    title: "Real-Time Booking Updates",
    description:
      "Get instant notifications when your booking is accepted, rejected, or if any changes occur. Stay informed at every step.",
  },
  {
    icon: "❌",
    title: "Free Cancellation",
    description:
      "Cancel any pending or confirmed booking before the scheduled time at no charge. Full flexibility, no penalties.",
  },
  {
    icon: "👤",
    title: "Host Information Visible",
    description:
      "See the host's name on every charger listing. Know who you're booking with before you commit.",
  },
];

const safetyForHosts = [
  {
    icon: "🔐",
    title: "Authenticated Users Only",
    description:
      "Every user on EVSetu is authenticated via email verification. Only verified accounts can make or receive bookings.",
  },
  {
    icon: "✅",
    title: "Accept or Reject Control",
    description:
      "You have full control over every booking request. Accept only the bookings you're comfortable with — no auto-approvals.",
  },
  {
    icon: "🔔",
    title: "Instant Booking Alerts",
    description:
      "Receive real-time notifications the moment a driver requests a booking, so you can respond promptly.",
  },
  {
    icon: "✏️",
    title: "Full Listing Control",
    description:
      "Edit your charger details, update pricing, change availability hours, or temporarily pause your listing anytime.",
  },
  {
    icon: "🗑️",
    title: "Remove Listings Anytime",
    description:
      "If you no longer want to host, simply delete your charger listing. No commitments, no lock-in.",
  },
];

const platformSafety = [
  {
    icon: "🔒",
    title: "Secure Authentication",
    description:
      "Powered by Supabase Auth with encrypted sessions and secure password handling.",
  },
  {
    icon: "🛡️",
    title: "Protected APIs",
    description:
      "Every API endpoint is protected with token verification, role checks, and ownership validation.",
  },
  {
    icon: "📱",
    title: "HTTPS Everywhere",
    description:
      "All data transmitted between your device and our servers is encrypted with HTTPS.",
  },
];

export default function SafetyPage() {
  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                SAFETY
              </Typography>
            </div>
            <Typography
              variant="h1"
              weight={700}
              className="text-black-900 mb-4"
            >
              Your Safety is Our{" "}
              <span className="text-[#365314]">Top Priority</span>
            </Typography>
            <Typography
              variant="body"
              className="text-black-600 max-w-2xl mx-auto"
            >
              We&apos;ve built multiple layers of safety and trust into EVSetu so
              that both drivers and hosts can use the platform with complete
              confidence.
            </Typography>
          </AnimateOnScroll>

          {/* Safety for Drivers */}
          <AnimateOnScroll animation="fadeInUp" className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              
              <Typography variant="h2" weight={600} className="text-black-900">
                Safety for Drivers
              </Typography>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {safetyForDrivers.map((item, index) => (
                <AnimateOnScroll
                  key={item.title}
                  animation="fadeInUp"
                  delay={0.08 * index}
                >
                  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-lg transition-all duration-500 group h-full">
                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <Typography
                      variant="para"
                      weight={600}
                      className="text-black-900 mb-2"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="chip"
                      className="text-black-600 leading-relaxed"
                    >
                      {item.description}
                    </Typography>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Safety for Hosts */}
          <AnimateOnScroll animation="fadeInUp" className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Typography variant="h2" weight={600} className="text-black-900">
                Safety for Hosts
              </Typography>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {safetyForHosts.map((item, index) => (
                <AnimateOnScroll
                  key={item.title}
                  animation="fadeInUp"
                  delay={0.08 * index}
                >
                  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-lg transition-all duration-500 group h-full">
                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <Typography
                      variant="para"
                      weight={600}
                      className="text-black-900 mb-2"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="chip"
                      className="text-black-600 leading-relaxed"
                    >
                      {item.description}
                    </Typography>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Platform Security */}
          <AnimateOnScroll animation="fadeInUp" className="mb-16">
            <div className="bg-[#365314] rounded-3xl p-8 md:p-12">
              <Typography
                variant="h3"
                weight={600}
                className="text-white mb-8 text-center"
              >
                Platform Security
              </Typography>
              <div className="grid md:grid-cols-3 gap-6">
                {platformSafety.map((item, index) => (
                  <AnimateOnScroll
                    key={item.title}
                    animation="fadeInUp"
                    delay={0.1 * index}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <Typography
                        variant="para"
                        weight={600}
                        className="text-[#d9f99d] mb-2"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="chip" className="text-white/80">
                        {item.description}
                      </Typography>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Report CTA */}
          <AnimateOnScroll animation="scaleIn">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E5E5E5] text-center">
              <div className="text-4xl mb-4">🚨</div>
              <Typography
                variant="h3"
                weight={600}
                className="text-black-900 mb-3"
              >
                See Something Concerning?
              </Typography>
              <Typography
                variant="para"
                className="text-black-600 mb-6 max-w-md mx-auto"
              >
                If you encounter any safety issue or suspicious activity, let us
                know immediately. We take every report seriously.
              </Typography>
              <Link href="/report-concern">
                <Button
                  text="Report a Concern"
                  bg="#365314"
                  color="#FFFFFF"
                  hoverBg="#1a2e05"
                  variant="lg"
                />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}