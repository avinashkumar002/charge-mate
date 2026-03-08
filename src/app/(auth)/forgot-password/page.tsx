"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import EmailIcon from "@/assets/svgs/EmailIcon";
import Spinner from "@/components/Spinner/Spinner";
import { supabase } from "@/lib/supabase/client";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) {
        throw new Error(resetError.message);
      }

      setIsEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <section className="min-h-screen flex items-center justify-center py-12 px-4">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] text-center">
              <div className="text-6xl mb-4">📧</div>
              <Typography variant="h3" weight={600} className="text-black-900 mb-2">
                Check Your Email
              </Typography>
              <Typography variant="para" className="text-black-600 mb-6">
                We&apos;ve sent a password reset link to your email. Click the link to set a new password.
              </Typography>
              <Typography variant="chip" className="text-black-400 mb-6">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </Typography>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="text-[#2C7FFF] hover:underline font-semibold text-sm"
                >
                  Try another email
                </button>
                <Link href="/login" className="text-black-600 hover:underline text-sm">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <Typography variant="h2" weight={600} className="text-black-900">
                Forgot Password?
              </Typography>
              <Typography variant="para" weight={400} className="text-black-700">
                Enter your email and we&apos;ll send you a reset link
              </Typography>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <Typography variant="para" className="text-red-600">
                  {error}
                </Typography>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <InputGroup
                placeholder="Email Address"
                type="email"
                Icon={EmailIcon}
                error={errors.email?.message}
                register={register("email")}
              />

              <Button
                text={isLoading ? "Sending..." : "Send Reset Link"}
                type="submit"
                variant="lg"
                bg="#d9f99d"
                color="#101010"
                hoverBg={isLoading ? "#d9f99d" : "#bef264"}
                className={`w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                icon={isLoading ? <Spinner size="sm" color="#101010" /> : undefined}
                iconPosition="left"
              />
            </form>

            <div className="text-center">
              <Link href="/login" className="text-[#2C7FFF] hover:underline font-semibold text-sm">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}