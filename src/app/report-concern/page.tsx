"use client";
import { useState } from "react";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import toast from "react-hot-toast";

const concernTypes = [
  {
    value: "safety",
    label: "🛡️ Safety Issue",
    description:
      "Unsafe charger location, damaged equipment, or security concern",
  },
  {
    value: "host",
    label: "🏠 Host Issue",
    description:
      "Unresponsive host, incorrect listing details, or misleading information",
  },
  {
    value: "driver",
    label: "🚗 Driver Issue",
    description:
      "No-show, property damage, or inappropriate behavior",
  },
  {
    value: "technical",
    label: "🐛 Technical Problem",
    description:
      "App bug, payment issue, or booking system error",
  },
  {
    value: "other",
    label: "📌 Other",
    description: "Anything else that needs our attention",
  },
];

export default function ReportConcernPage() {
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedType) {
      toast.error("Please select a concern type");
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      toast.error("Please describe your concern in at least 20 characters");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email so we can follow up");
      return;
    }

    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `[EVSetu Report] ${
        concernTypes.find((c) => c.value === selectedType)?.label || "Concern"
      }`
    );
    const body = encodeURIComponent(
      `Concern Type: ${selectedType}\n\nDescription:\n${description.trim()}\n\nReporter Email: ${email.trim()}`
    );

    window.location.href = `mailto:avinashsingh30oct@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Opening your email client...");
    }, 500);
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-2xl mx-auto">
            <AnimateOnScroll animation="scaleIn">
              <div className="bg-white rounded-2xl p-10 md:p-14 border border-[#E5E5E5] text-center">
                <div className="text-6xl mb-6">✅</div>
                <Typography
                  variant="h2"
                  weight={600}
                  className="text-black-900 mb-4"
                >
                  Thank You for Reporting
                </Typography>
                <Typography
                  variant="para"
                  className="text-black-600 mb-8 max-w-md mx-auto"
                >
                  Your email client should have opened with the report details
                  pre-filled. Please send the email and we&apos;ll review your
                  concern as soon as possible.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    text="Submit Another Report"
                    bg="#d9f99d"
                    color="#365314"
                    hoverBg="#bef264"
                    variant="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedType("");
                      setDescription("");
                      setEmail("");
                    }}
                  />
                  <a href="/">
                    <Button
                      text="Back to Home"
                      bg="#FFFFFF"
                      color="#365314"
                      hoverBg="#F9F9F9"
                      variant="sm"
                      boxShadow="inset 0 0 0 1px #365314"
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

  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-red-100 rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-red-700">
                REPORT A CONCERN
              </Typography>
            </div>
            <Typography
              variant="h1"
              weight={700}
              className="text-black-900 mb-4"
            >
              We Take Every Report{" "}
              <span className="text-[#365314]">Seriously</span>
            </Typography>
            <Typography
              variant="body"
              className="text-black-600 max-w-xl mx-auto"
            >
              If you&apos;ve experienced or witnessed something concerning while
              using EVSetu, please let us know. Your safety matters to us.
            </Typography>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll animation="fadeInUp" delay={0.15}>
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E5E5E5]">
              {/* Concern Type */}
              <div className="mb-8">
                <Typography
                  variant="para"
                  weight={600}
                  className="text-black-900 mb-4"
                >
                  What type of concern do you have?
                </Typography>
                <div className="flex flex-col gap-3">
                  {concernTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        selectedType === type.value
                          ? "border-[#365314] bg-[#f0fdf4]"
                          : "border-[#E5E5E5] hover:border-[#d9f99d]"
                      }`}
                    >
                      <Typography
                        variant="para"
                        weight={600}
                        className="text-black-900 mb-1"
                      >
                        {type.label}
                      </Typography>
                      <Typography variant="chip" className="text-black-500">
                        {type.description}
                      </Typography>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <Typography
                  variant="para"
                  weight={600}
                  className="text-black-900 mb-2"
                >
                  Describe the issue
                </Typography>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide as much detail as possible about what happened, when, and where..."
                  rows={5}
                  className="w-full px-4 py-3 border-[1.5px] border-[#365314] rounded-xl text-black-800 placeholder:text-[#727272] outline-none resize-none focus:ring-2 focus:ring-[#d9f99d]"
                />
                <Typography variant="chip" className="text-black-400 mt-1">
                  Minimum 20 characters
                </Typography>
              </div>

              {/* Email */}
              <div className="mb-8">
                <Typography
                  variant="para"
                  weight={600}
                  className="text-black-900 mb-2"
                >
                  Your email (for follow-up)
                </Typography>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-[1.5px] border-[#365314] rounded-xl text-black-800 placeholder:text-[#727272] outline-none focus:ring-2 focus:ring-[#d9f99d]"
                />
              </div>

              {/* Submit */}
              <Button
                text={isSubmitting ? "Submitting..." : "Submit Report"}
                bg="#365314"
                color="#FFFFFF"
                hoverBg="#1a2e05"
                variant="lg"
                className="w-full"
                onClick={handleSubmit}
              />

              <Typography
                variant="chip"
                className="text-black-400 text-center mt-4 block"
              >
                Your report will be sent to our team via email. We&apos;ll
                review and respond within 24–48 hours.
              </Typography>
            </div>
          </AnimateOnScroll>

          {/* Emergency note */}
          <AnimateOnScroll animation="fadeInUp" delay={0.1} className="mt-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <Typography
                variant="para"
                weight={600}
                className="text-red-700 mb-2"
              >
                ⚠️ Emergency?
              </Typography>
              <Typography variant="chip" className="text-red-600">
                If you&apos;re in immediate danger, please contact your local
                emergency services first. Then report the incident to us.
              </Typography>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}