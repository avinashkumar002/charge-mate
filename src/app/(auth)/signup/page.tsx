"use client";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import EmailIcon from "@/assets/svgs/EmailIcon";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
import { signupSchema, SignupFormValues } from "@/schemas/authSchema";
import { supabase } from "@/lib/supabase/client";
import Spinner from "@/components/Spinner/Spinner";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const roleFromUrl = searchParams.get("role") as "driver" | "host" | null;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: roleFromUrl || undefined,
        },
    });

    const onSubmit = async (data: SignupFormValues) => {
        setIsLoading(true);
        setError("");

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (authError || !authData.user) {
                throw new Error(authError?.message || "Signup failed");
            }

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: authData.user.id,
                    email: data.email,
                    name: data.name,
                    role: data.role,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to save user data");
            }

            dispatch(setUser({
                id: authData.user.id,
                email: data.email,
                name: data.name,
                role: data.role,
            }));

            if (data.role === "driver") {
                router.push("/driver");
            } else {
                router.push("/host");
            }

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <Typography variant="h2" weight={600} className="text-black-900">
                        Create Your Account
                    </Typography>
                    <Typography variant="para" weight={400} className="text-black-700">
                        Join ChargeMate and start {roleFromUrl === "host" ? "earning" : "charging"} today
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
                        placeholder="Full Name"
                        type="text"
                        Icon={ProfileIcon}
                        error={errors.name?.message}
                        register={register("name")}
                    />

                    <InputGroup
                        placeholder="Email Address"
                        type="email"
                        Icon={EmailIcon}
                        error={errors.email?.message}
                        register={register("email")}
                    />

                    <InputGroup
                        placeholder="Password (min 8 characters)"
                        type="password"
                        Icon={ProfileIcon}
                        error={errors.password?.message}
                        register={register("password")}
                    />

                    <div className="flex flex-col gap-2">
                        <Typography variant="chip" weight={500} className="text-black-900">
                            I want to join as:
                        </Typography>
                        <div className="flex gap-3">
                            <label className="flex items-center gap-2 py-3.5 px-4 bg-[#F9F9F9] hover:bg-[#ECF5FF] border border-[#F9F9F9] hover:border-[#8EC7FF] has-checked:bg-[#ECF5FF] has-checked:border-[#2C7FFF] w-full rounded-lg cursor-pointer group">
                                <input
                                    type="radio"
                                    {...register("role")}
                                    value="driver"
                                    className="w-4 h-4 appearance-none rounded-full border border-[#D0D0D0] checked:bg-[#2C7FFF] checked:border-[#2C7FFF]"
                                />
                                <span className="font-medium text-sm text-black-800">Driver</span>
                            </label>

                            <label className="flex items-center gap-2 py-3.5 px-4 bg-[#F9F9F9] hover:bg-[#ECF5FF] border border-[#F9F9F9] hover:border-[#8EC7FF] has-checked:bg-[#ECF5FF] has-checked:border-[#2C7FFF] w-full rounded-lg cursor-pointer group">
                                <input
                                    type="radio"
                                    {...register("role")}
                                    value="host"
                                    className="w-4 h-4 appearance-none rounded-full border border-[#D0D0D0] checked:bg-[#2C7FFF] checked:border-[#2C7FFF]"
                                />
                                <span className="font-medium text-sm text-black-800">Host</span>
                            </label>
                        </div>
                        {errors.role && (
                            <Typography variant="chip" className="text-red-500">
                                {errors.role.message}
                            </Typography>
                        )}
                    </div>

                    <Button
                        text={isLoading ? "Creating Account..." : "Sign Up"}
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
                    <Typography variant="para" className="text-black-700">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#2C7FFF] hover:underline font-semibold">
                            Login
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <section className="min-h-screen flex items-center justify-center py-12 px-4">
            <Container>
                <Suspense fallback={<Spinner size="lg" color="#365314" />}>
                    <SignupForm />
                </Suspense>
            </Container>
        </section>
    );
}