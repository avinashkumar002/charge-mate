"use client";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";

const categories = [
  {
    icon: "🚗",
    title: "For Drivers",
    topics: [
      {
        question: "How do I find a charger near me?",
        answer:
          "Open the search page from your dashboard, allow location access, and browse nearby chargers sorted by distance. You can filter by charger type, price, and power output.",
      },
      {
        question: "How do I book a charging slot?",
        answer:
          "Select a charger, pick your preferred date, choose a start and end time, review the price, and confirm your booking. You'll receive a real-time notification once the host responds.",
      },
      {
        question: "How do I get directions to a charger?",
        answer:
          "On the charger detail page, tap the 'Get Directions' button. It will open your default maps app with turn-by-turn navigation to the charger location.",
      },
      {
        question: "Can I cancel a booking?",
        answer:
          "Yes. Go to My Bookings, select the booking, and tap Cancel. You can cancel any pending or confirmed booking before the scheduled time.",
      },
    ],
  },
  {
    icon: "🏠",
    title: "For Hosts",
    topics: [
      {
        question: "How do I list my charger?",
        answer:
          "Go to your host dashboard, click 'Add Charger', fill in the details (title, address, charger type, power output, pricing), upload a photo, pin your location on the map, and submit.",
      },
      {
        question: "How do I manage booking requests?",
        answer:
          "When a driver books your charger, you'll receive a real-time notification. Go to your Bookings page to accept or reject the request with one tap.",
      },
      {
        question: "Can I edit my charger listing?",
        answer:
          "Yes. From your dashboard, click Edit on any charger to update its details, pricing, availability, photo, or location at any time.",
      },
      {
        question: "How do I set my availability?",
        answer:
          "When adding or editing a charger, set your available start and end times. Drivers can only book slots within your specified hours.",
      },
    ],
  },
  {
    icon: "👤",
    title: "Account & Profile",
    topics: [
      {
        question: "How do I update my profile?",
        answer:
          "Click your avatar in the header or navigate to the Profile page. You can edit your name and phone number. Email cannot be changed as it's linked to your login.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Go to your Profile page and click 'Change Password' under the Security section. You'll receive a password reset link via email.",
      },
      {
        question: "Can I switch between driver and host?",
        answer:
          "Currently, each account is registered as either a driver or a host. To use both roles, you can create a separate account with a different email.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                HELP CENTER
              </Typography>
            </div>
            <Typography variant="h1" weight={700} className="text-black-900 mb-4">
              How Can We <span className="text-[#365314]">Help You?</span>
            </Typography>
            <Typography variant="body" className="text-black-600 max-w-xl mx-auto">
              Find answers to common questions about using EVSetu as a driver or
              host. Browse by category below.
            </Typography>
          </AnimateOnScroll>

          {/* Quick Links */}
          <AnimateOnScroll animation="fadeInUp" delay={0.1} className="mb-14">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "❓", label: "FAQ", href: "/faq" },
                { icon: "🛡️", label: "Safety", href: "/safety" },
                { icon: "📧", label: "Contact Us", href: "mailto:avinashsingh30oct@gmail.com" },
              ].map((link) => (
                <Link key={link.label} href={link.href}>
                  <div className="bg-white rounded-xl p-5 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-lg transition-all duration-500 text-center cursor-pointer group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-500">
                      {link.icon}
                    </div>
                    <Typography variant="para" weight={600} className="text-black-900">
                      {link.label}
                    </Typography>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Categories */}
          <div className="flex flex-col gap-12">
            {categories.map((category, catIndex) => (
              <AnimateOnScroll
                key={category.title}
                animation="fadeInUp"
                delay={0.1 * catIndex}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <Typography variant="h3" weight={600} className="text-black-900">
                      {category.title}
                    </Typography>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-col gap-4">
                    {category.topics.map((topic, topicIndex) => (
                      <AnimateOnScroll
                        key={topicIndex}
                        animation="fadeInUp"
                        delay={0.05 * topicIndex}
                      >
                        <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] transition-colors duration-300">
                          <Typography
                            variant="para"
                            weight={600}
                            className="text-black-900 mb-2"
                          >
                            {topic.question}
                          </Typography>
                          <Typography variant="para" className="text-black-600 leading-relaxed">
                            {topic.answer}
                          </Typography>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Contact CTA */}
          <AnimateOnScroll animation="scaleIn" className="mt-16">
            <div className="bg-[#365314] rounded-3xl p-10 md:p-14 text-center">
              <div className="text-4xl mb-4">📩</div>
              <Typography variant="h3" weight={600} className="text-white mb-3">
                Can&apos;t find what you need?
              </Typography>
              <Typography variant="para" className="text-[#d9f99d] mb-6 max-w-md mx-auto">
                Reach out to us directly and we&apos;ll get back to you as soon as
                possible.
              </Typography>
              <a href="mailto:avinashsingh30oct@gmail.com">
                <Button
                  text="Email Us"
                  bg="#d9f99d"
                  color="#365314"
                  hoverBg="#bef264"
                  variant="lg"
                />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}