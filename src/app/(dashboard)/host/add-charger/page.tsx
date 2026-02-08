"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import InputGroup from "@/components/InputGroup/InputGroup";
import SelectGroup from "@/components/SelectGroup/SelectGroup";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Spinner from "@/components/Spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  chargerSchema,
  ChargerFormValues,
  CHARGER_TYPES,
  POWER_OUTPUTS,
  TIME_SLOTS,
} from "@/schemas/chargerSchema"

export default function AddChargerPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChargerFormValues>({
    resolver: zodResolver(chargerSchema),
    defaultValues: {
      title: "",
      address: "",
      pincode: "",
      price_per_hour: undefined,
      charger_type: undefined,
      power_output: undefined,
      available_start: "",
      available_end: "",
    },
  });

  const onSubmit = async (data: ChargerFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chargers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          host_id: user?.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to add charger");
        setIsLoading(false);
        return;
      }

      // Redirect to host dashboard
      router.push("/host");
      router.refresh();
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Convert options for SelectGroup
  const chargerTypeOptions = CHARGER_TYPES.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  const powerOutputOptions = POWER_OUTPUTS.map((power) => ({
    value: power.value,
    label: power.label,
  }));

  const timeSlotOptions = TIME_SLOTS.map((time) => ({
    value: time,
    label: time,
  }));

  return (
    <ProtectedRoute allowedRole="host">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-black-600 hover:text-black-900 mb-4"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </button>
              <Typography variant="h2" weight={600} className="text-black-900">
                Add New Charger
              </Typography>
              <Typography variant="para" className="text-black-600 mt-2">
                List your charger and start earning
              </Typography>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5]">
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <Typography variant="para" className="text-red-600">
                    {error}
                  </Typography>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Title */}
                <InputGroup
                  placeholder="Charger Title (e.g., Home Charger - Koramangala)"
                  type="text"
                  error={errors.title?.message}
                  register={register("title")}
                />

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <Typography variant="chip" weight={500} className="text-black-900">
                    Address
                  </Typography>
                  <textarea
                    {...register("address")}
                    placeholder="Full address where charger is located"
                    rows={3}
                    className={`w-full px-4 py-3.5 bg-[#F9F9F9] border rounded-lg text-sm font-medium text-black-800 outline-none resize-none
                      ${errors.address ? "border-red-500" : "border-[#F9F9F9] focus:border-[#2C7FFF]"}
                    `}
                  />
                  {errors.address && (
                    <Typography variant="chip" className="text-red-500">
                      {errors.address.message}
                    </Typography>
                  )}
                </div>

                {/* Pincode & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup
                    placeholder="Pincode (6 digits)"
                    type="text"
                    error={errors.pincode?.message}
                    register={register("pincode")}
                  />
                  <InputGroup
                    placeholder="Price per hour (₹)"
                    type="number"
                    error={errors.price_per_hour?.message}
                    register={register("price_per_hour", { valueAsNumber: true })}
                  />
                </div>

                {/* Charger Type & Power Output Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectGroup
                    label="Charger Type"
                    placeholder="Select charger type"
                    options={chargerTypeOptions}
                    error={errors.charger_type?.message}
                    register={register("charger_type")}
                  />
                  <SelectGroup
                    label="Power Output"
                    placeholder="Select power output"
                    options={powerOutputOptions}
                    error={errors.power_output?.message}
                    register={register("power_output", { valueAsNumber: true })}
                  />
                </div>

                {/* Availability Times */}
                <div className="flex flex-col gap-2">
                  <Typography variant="chip" weight={500} className="text-black-900">
                    Availability Hours
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup
                      placeholder="Start Time"
                      options={timeSlotOptions}
                      error={errors.available_start?.message}
                      register={register("available_start")}
                    />
                    <SelectGroup
                      placeholder="End Time"
                      options={timeSlotOptions}
                      error={errors.available_end?.message}
                      register={register("available_end")}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <Button
                    text={isLoading ? "Adding Charger..." : "Add Charger"}
                    type="submit"
                    variant="lg"
                    bg="#d9f99d"
                    color="#101010"
                    hoverBg={isLoading ? "#d9f99d" : "#bef264"}
                    className={`w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    icon={isLoading ? <Spinner size="sm" color="#101010" /> : undefined}
                    iconPosition="left"
                  />
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}