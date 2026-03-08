"use client";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
import Spinner from "@/components/Spinner/Spinner";
import { supabase } from "@/lib/supabase/client";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setIsLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setIsSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] text-center">
          <div className="text-6xl mb-4">✅</div>
          <Typography variant="h3" weight={600} className="text-black-900 mb-2">
            Password Reset Successful
          </Typography>
          <Typography variant="para" className="text-black-600 mb-4">
            Your password has been updated. Redirecting to login...
          </Typography>
          <Link href="/login">
            <Button
              text="Go to Login"
              bg="#d9f99d"
              color="#101010"
              hoverBg="#bef264"
              variant="lg"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <Typography variant="h2" weight={600} className="text-black-900">
            Set New Password
          </Typography>
          <Typography variant="para" weight={400} className="text-black-700">
            Enter your new password below
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
            placeholder="New Password (min 8 characters)"
            type="password"
            Icon={ProfileIcon}
            error={errors.password?.message}
            register={register("password")}
          />

          <InputGroup
            placeholder="Confirm New Password"
            type="password"
            Icon={ProfileIcon}
            error={errors.confirmPassword?.message}
            register={register("confirmPassword")}
          />

          <Button
            text={isLoading ? "Resetting..." : "Reset Password"}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <Container>
        <Suspense fallback={<Spinner size="lg" color="#365314" />}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </section>
  );
}