"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import EmailIcon from "@/assets/svgs/EmailIcon";
import { loginSchema, LoginFormValues } from "@/schemas/authSchema";
import { supabase } from "@/lib/supabase/client";
import Spinner from "@/components/Spinner/Spinner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError || !authData.user || !authData.session) {
        throw new Error("Invalid email or password");
      }

      const response = await fetch(`/api/user/${authData.user.id}`, {
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();

      if (userData.role === "driver") {
        router.push("/driver");
      } else {
        router.push("/host");
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2 text-center">
              <Typography variant="h2" weight={600} className="text-black-900">
                Welcome Back
              </Typography>
              <Typography variant="para" weight={400} className="text-black-700">
                Login to continue to your dashboard
              </Typography>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <Typography variant="para" className="text-red-600">
                  {error}
                </Typography>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <InputGroup
                placeholder="Email Address"
                type="email"
                Icon={EmailIcon}
                error={errors.email?.message}
                register={register("email")}
              />

              <InputGroup
                placeholder="Password"
                type="password"
                Icon={EmailIcon}
                error={errors.password?.message}
                register={register("password")}
              />

              {/* Submit Button */}
              <Button
                text={isLoading ? "Logging in..." : "Login"}
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

            {/* Signup Link */}
            <div className="text-center">
              <Typography variant="para" className="text-black-700">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#2C7FFF] hover:underline font-semibold">
                  Sign Up
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}