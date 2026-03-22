"use client";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import FaqList from "@/components/molecules/Faq/FaqList";

export default function FaqPage() {
  return (
    <section className="min-h-screen pt-28 pb-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 bg-[#d9f99d] rounded-full mb-4">
              <Typography variant="chip" weight={600} className="text-[#365314]">
                FAQ
              </Typography>
            </div>
            <Typography variant="h1" weight={700} className="text-black-900 mb-4">
              Frequently Asked{" "}
              <span className="text-[#365314]">Questions</span>
            </Typography>
            <Typography variant="body" className="text-black-600">
              Everything you need to know about EVSetu. Can&apos;t find what
              you&apos;re looking for? Reach out to our support team below.
            </Typography>
          </AnimateOnScroll>

          {/* FAQ List — show all */}
          <AnimateOnScroll animation="fadeInUp" delay={0.15}>
            <FaqList />
          </AnimateOnScroll>

          {/* Contact CTA */}
          <AnimateOnScroll animation="scaleIn" delay={0.1} className="mt-16">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E5E5E5] text-center">
              <div className="text-4xl mb-4">💬</div>
              <Typography variant="h3" weight={600} className="text-black-900 mb-3">
                Still have questions?
              </Typography>
              <Typography variant="para" className="text-black-600 mb-6 max-w-md mx-auto">
                Our team is happy to help. Reach out and we&apos;ll get back to
                you as soon as possible.
              </Typography>
              <a href="mailto:avinashsingh30oct@gmail.com">
                <Button
                  text="Contact Support"
                  bg="#365314"
                  color="#FFFFFF"
                  hoverBg="#1a2e05"
                  variant="lg"
                />
              </a>
            </div>
          </AnimateOnScroll>

          {/* Join CTA */}
          <AnimateOnScroll animation="fadeInUp" className="mt-12 text-center">
            <Typography variant="para" className="text-black-600 mb-4">
              Ready to get started?
            </Typography>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup?role=driver">
                <Button
                  text="Join as Driver"
                  bg="#d9f99d"
                  color="#365314"
                  hoverBg="#bef264"
                  variant="sm"
                  className="w-full sm:w-auto"
                />
              </Link>
              <Link href="/signup?role=host">
                <Button
                  text="Join as Host"
                  bg="#FFFFFF"
                  color="#365314"
                  hoverBg="#F9F9F9"
                  variant="sm"
                  boxShadow="inset 0 0 0 1px #365314"
                  className="w-full sm:w-auto"
                />
              </Link>
            </div>
            <Typography variant="chip" className="text-black-400 mt-4">
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