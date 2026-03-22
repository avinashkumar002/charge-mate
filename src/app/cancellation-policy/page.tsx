"use client";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";

const driverPolicies = [
  {
    status: "Pending Bookings",
    icon: "⏳",
    description:
      "You can cancel any booking that is still pending (waiting for host approval) at any time. No charges apply.",
    action: "Cancel anytime before host accepts",
    highlight: false,
  },
  {
    status: "Confirmed Bookings",
    icon: "✅",
    description:
      "You can cancel a confirmed booking before the scheduled start time. We recommend cancelling as early as possible so the host can open the slot for others.",
    action: "Cancel before scheduled start time",
    highlight: false,
  },
  {
    status: "Completed Bookings",
    icon: "🏁",
    description:
      "Once a booking is marked as completed by the host, it cannot be cancelled. This status is final.",
    action: "Cannot be cancelled",
    highlight: true,
  },
];

const hostPolicies = [
  {
    status: "Reject a Request",
    icon: "❌",
    description:
      "You can reject any pending booking request if the timing doesn't work or for any other reason. The driver will be notified immediately.",
    action: "Reject before accepting",
  },
  {
    status: "Cancel After Accepting",
    icon: "🔄",
    description:
      "If you've already accepted a booking but can no longer accommodate it, you can cancel it. The driver will receive a notification about the cancellation.",
    action: "Cancel confirmed bookings if needed",
  },
];

const steps = [
  { step: "1", text: "Go to your bookings page from the dashboard" },
  { step: "2", text: "Find the booking you want to cancel" },
  { step: "3", text: "Click on the booking to view details" },
  { step: "4", text: "Tap the 'Cancel Booking' button" },
  { step: "5", text: "The other party will be notified instantly" },
];

export default function CancellationPolicyPage() {
  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                CANCELLATION POLICY
              </Typography>
            </div>
            <Typography
              variant="h1"
              weight={700}
              className="text-black-900 mb-4"
            >
              Flexible <span className="text-[#365314]">Cancellations</span>
            </Typography>
            <Typography
              variant="body"
              className="text-black-600 max-w-2xl mx-auto"
            >
              We believe in flexibility. Both drivers and hosts can manage their
              bookings without stress or hidden penalties.
            </Typography>
          </AnimateOnScroll>

          {/* Key Point */}
          <AnimateOnScroll animation="scaleIn" delay={0.1} className="mb-14">
            <div className="bg-[#365314] rounded-2xl p-8 text-center">
              <Typography
                variant="h3"
                weight={600}
                className="text-[#d9f99d] mb-2"
              >
                💡 No Cancellation Fees
              </Typography>
              <Typography variant="para" className="text-white/90">
                EVSetu does not charge any cancellation fees. All cancellations
                are free for both drivers and hosts.
              </Typography>
            </div>
          </AnimateOnScroll>

          {/* Driver Cancellation */}
          <AnimateOnScroll animation="fadeInUp" className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              
              <Typography variant="h2" weight={600} className="text-black-900">
                For Drivers
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              {driverPolicies.map((policy, index) => (
                <AnimateOnScroll
                  key={policy.status}
                  animation="fadeInLeft"
                  delay={0.1 * index}
                >
                  <div
                    className={`bg-white rounded-xl p-6 border hover:shadow-lg transition-all duration-500 ${
                      policy.highlight
                        ? "border-red-200 bg-red-50/30"
                        : "border-[#E5E5E5] hover:border-[#d9f99d]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl mt-1">{policy.icon}</div>
                      <div className="flex-1">
                        <Typography
                          variant="para"
                          weight={600}
                          className="text-black-900 mb-1"
                        >
                          {policy.status}
                        </Typography>
                        <Typography
                          variant="para"
                          className="text-black-600 leading-relaxed mb-3"
                        >
                          {policy.description}
                        </Typography>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            policy.highlight
                              ? "bg-red-100 text-red-700"
                              : "bg-[#f0fdf4] text-[#365314]"
                          }`}
                        >
                          {policy.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Host Cancellation */}
          <AnimateOnScroll animation="fadeInUp" className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <Typography variant="h2" weight={600} className="text-black-900">
                For Hosts
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
              {hostPolicies.map((policy, index) => (
                <AnimateOnScroll
                  key={policy.status}
                  animation="fadeInRight"
                  delay={0.1 * index}
                >
                  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-lg transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl mt-1">{policy.icon}</div>
                      <div className="flex-1">
                        <Typography
                          variant="para"
                          weight={600}
                          className="text-black-900 mb-1"
                        >
                          {policy.status}
                        </Typography>
                        <Typography
                          variant="para"
                          className="text-black-600 leading-relaxed mb-3"
                        >
                          {policy.description}
                        </Typography>
                        <span className="inline-block px-3 py-1 bg-[#f0fdf4] text-[#365314] text-xs font-semibold rounded-full">
                          {policy.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

          {/* How to Cancel */}
          <AnimateOnScroll animation="fadeInUp" className="mb-14">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E5E5E5]">
              <Typography
                variant="h3"
                weight={600}
                className="text-black-900 mb-6 text-center"
              >
                How to Cancel a Booking
              </Typography>
              <div className="flex flex-col gap-4 max-w-lg mx-auto">
                {steps.map((item, index) => (
                  <AnimateOnScroll
                    key={item.step}
                    animation="fadeInUp"
                    delay={0.08 * index}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#d9f99d] flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-[#365314]">
                          {item.step}
                        </span>
                      </div>
                      <Typography variant="para" className="text-black-700">
                        {item.text}
                      </Typography>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contact CTA */}
          <AnimateOnScroll animation="scaleIn">
            <div className="text-center">
              <Typography variant="para" className="text-black-600 mb-4">
                Have questions about cancellations?
              </Typography>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/faq">
                  <Button
                    text="View FAQ"
                    bg="#d9f99d"
                    color="#365314"
                    hoverBg="#bef264"
                    variant="sm"
                    className="w-full sm:w-auto"
                  />
                </Link>
                <a href="mailto:avinashsingh30oct@gmail.com">
                  <Button
                    text="Contact Support"
                    bg="#FFFFFF"
                    color="#365314"
                    hoverBg="#F9F9F9"
                    variant="sm"
                    boxShadow="inset 0 0 0 1px #365314"
                    className="w-full sm:w-auto"
                  />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}