"use client";
import { useState, useMemo, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useGetChargerByIdQuery } from "@/store/services/chargerApi";
import { useCreateBookingMutation } from "@/store/services/bookingApi";
import { generateTimeSlots, calculateBookingPrice } from "@/schemas/bookingSchema";
import { CHARGER_TYPES } from "@/schemas/chargerSchema";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookChargerPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const { user } = useAuth();
  const { data: charger, isLoading: isLoadingCharger } = useGetChargerByIdQuery(id);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  // Generate available time slots
  const timeSlots = useMemo(() => {
    if (!charger) return [];
    return generateTimeSlots(charger.available_start, charger.available_end);
  }, [charger]);

  // Calculate price
  const totalPrice = useMemo(() => {
    if (!startTime || !endTime || !charger) return 0;
    return calculateBookingPrice(startTime, endTime, charger.price_per_hour);
  }, [startTime, endTime, charger]);

  // Filter end time options (must be after start time)
  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startIndex = timeSlots.indexOf(startTime);
    return timeSlots.slice(startIndex + 1);
  }, [startTime, timeSlots]);

  const handleBooking = async () => {
    if (!user?.id || !charger || !dateParam || !startTime || !endTime) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    try {
      await createBooking({
        charger_id: charger.id,
        driver_id: user.id,
        booking_date: dateParam,
        start_time: startTime,
        end_time: endTime,
        total_price: totalPrice,
      }).unwrap();

      toast.success("Booking request sent! ⚡");
      router.push("/driver/bookings");

    } catch (err: any) {
      setError(err.data?.error || "Failed to create booking");
    }
  };

  if (isLoadingCharger) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="#365314" />
      </div>
    );
  }

  if (!charger) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h3">Charger not found</Typography>
      </div>
    );
  }

  const chargerTypeLabel =
    CHARGER_TYPES.find((t) => t.value === charger.charger_type)?.label ||
    charger.charger_type;

  const formattedDate = dateParam
    ? new Date(dateParam).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "";

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-black-600 hover:text-black-900 mb-6"
            >
              <span>←</span>
              <span>Back to Charger</span>
            </button>

            {/* Header */}
            <Typography variant="h2" weight={600} className="text-black-900 mb-6">
              Complete Your Booking
            </Typography>

            {/* Charger Summary Card */}
            <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] mb-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#F9F9F9] shrink-0">
                  {charger.photo_url ? (
                    <Image
                      src={charger.photo_url}
                      alt={charger.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">🔌</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Typography variant="h4" weight={600} className="text-black-900">
                    {charger.title}
                  </Typography>
                  <Typography variant="chip" className="text-black-500 mt-1">
                    {charger.address}
                  </Typography>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-[#ECF5FF] text-[#2C7FFF] text-xs font-medium rounded">
                      {chargerTypeLabel}
                    </span>
                    <span className="px-2 py-1 bg-[#f5f9f0] text-[#365314] text-xs font-medium rounded">
                      ₹{charger.price_per_hour}/hr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5]">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <Typography variant="para" className="text-red-600">
                    {error}
                  </Typography>
                </div>
              )}

              {/* Date Display */}
              <div className="mb-6">
                <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                  Booking Date
                </Typography>
                <div className="bg-[#F9F9F9] rounded-lg p-4">
                  <Typography variant="para" weight={600} className="text-black-900">
                    📅 {formattedDate}
                  </Typography>
                </div>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Start Time */}
                <div>
                  <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                    Start Time
                  </Typography>
                  <select
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setEndTime(""); // Reset end time
                    }}
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer"
                  >
                    <option value="">Select start time</option>
                    {timeSlots.slice(0, -1).map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Time */}
                <div>
                  <Typography variant="chip" weight={500} className="text-black-700 mb-2 block">
                    End Time
                  </Typography>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={!startTime}
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select end time</option>
                    {endTimeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              {startTime && endTime && (
                <div className="bg-[#f5f9f0] rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="para" className="text-black-600">
                      Duration
                    </Typography>
                    <Typography variant="para" weight={500} className="text-black-900">
                      {parseInt(endTime) - parseInt(startTime)} hour(s)
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="para" className="text-black-600">
                      Rate
                    </Typography>
                    <Typography variant="para" weight={500} className="text-black-900">
                      ₹{charger.price_per_hour}/hr
                    </Typography>
                  </div>
                  <div className="border-t border-[#d9f99d] pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <Typography variant="h4" weight={600} className="text-black-900">
                        Total
                      </Typography>
                      <Typography variant="h3" weight={600} className="text-[#365314]">
                        ₹{totalPrice}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button
                text={isBooking ? "Booking..." : "Confirm Booking"}
                bg={startTime && endTime ? "#d9f99d" : "#E5E5E5"}
                color={startTime && endTime ? "#101010" : "#888888"}
                hoverBg={startTime && endTime ? "#bef264" : "#E5E5E5"}
                variant="lg"
                className={`w-full ${isBooking ? "opacity-70 cursor-not-allowed" : ""}`}
                onClick={handleBooking}
                icon={isBooking ? <Spinner size="sm" color="#101010" /> : undefined}
                iconPosition="left"
              />

              {/* Info */}
              <div className="mt-4 flex items-center gap-2 text-black-500 justify-center">
                <span>⚡</span>
                <Typography variant="chip">
                  Free cancellation up to 1 hour before
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}