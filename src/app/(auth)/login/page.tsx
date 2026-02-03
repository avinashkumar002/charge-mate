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
    console.log("🔐 Attempting login on client...");
    
    // Login with Supabase directly (client-side)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError || !authData.user) {
      throw new Error("Invalid email or password");
    }

    console.log("✅ Auth successful, user:", authData.user.id);

    // Fetch user role from our database
    const response = await fetch(`/api/user/${authData.user.id}`);
    const userData = await response.json();
    
    console.log("User data:", userData);

    // Redirect based on role
    if (userData.role === "driver") {
      router.push("/driver");
    } else {
      router.push("/host");
    }
    
    router.refresh();
  } catch (err: any) {
    console.error("💥 Login error:", err);
    setError(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

// const onSubmit = async (data: LoginFormValues) => {
//   setIsLoading(true);
//   setError("");

//   try {
//     console.log("🔐 Attempting login on client...");
    
//     const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
//       email: data.email,
//       password: data.password,
//     });

//     if (authError || !authData.user) {
//       throw new Error("Invalid email or password");
//     }

//     console.log("✅ Auth successful, user:", authData.user.id);

//     const response = await fetch(`/api/user/${authData.user.id}`);
//     const userData = await response.json();
    
//     console.log("📦 User data from API:", userData);
//     console.log("📋 Role is:", userData.role);
//     console.log("📋 Role type:", typeof userData.role);

//     // COMMENTED OUT FOR TESTING
//     // if (userData.role === "driver") {
//     //   router.push("/driver");
//     // } else {
//     //   router.push("/host");
//     // }
//     // router.refresh();
    
//   } catch (err: any) {
//     console.error("💥 Login error:", err);
//     setError(err.message || "Something went wrong");
//   } finally {
//     setIsLoading(false);
//   }
// };
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
                bg="#365314"
                color="#FFFFFF"
                hoverBg="#101010"
                className="w-full"
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