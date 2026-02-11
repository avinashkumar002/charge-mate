"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import { CHARGER_TYPES, POWER_OUTPUTS } from "@/schemas/chargerSchema";
import type { Charger } from "@/types/charger";

interface ChargerDetailsClientProps {
  charger: Charger;
}

export default function ChargerDetailsClient({ charger }: ChargerDetailsClientProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");

  const chargerTypeLabel =
    CHARGER_TYPES.find((t) => t.value === charger.charger_type)?.label ||
    charger.charger_type;

  const powerOutputLabel =
    POWER_OUTPUTS.find((p) => p.value === charger.power_output)?.label ||
    `${charger.power_output} kW`;

  // Generate next 7 days for booking
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split("T")[0],
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    return days;
  };

  const nextDays = getNextDays();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-black-600 hover:text-black-900 mb-6"
      >
        <span>←</span>
        <span>Back to Search</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-[#F9F9F9]">
            {charger.photo_url ? (
              <Image
                src={charger.photo_url}
                alt={charger.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl">🔌</span>
              </div>
            )}
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Typography variant="h2" weight={600} className="text-black-900">
                  {charger.title}
                </Typography>
                {charger.host && (
                  <Typography variant="para" className="text-black-500 mt-1">
                    Hosted by {charger.host.name}
                  </Typography>
                )}
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                charger.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {charger.status === "active" ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F9F9F9] rounded-xl p-4">
                <Typography variant="chip" className="text-black-500">
                  Charger Type
                </Typography>
                <Typography variant="para" weight={600} className="text-black-900 mt-1">
                  {chargerTypeLabel}
                </Typography>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-4">
                <Typography variant="chip" className="text-black-500">
                  Power Output
                </Typography>
                <Typography variant="para" weight={600} className="text-black-900 mt-1">
                  {powerOutputLabel}
                </Typography>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-4">
                <Typography variant="chip" className="text-black-500">
                  Available
                </Typography>
                <Typography variant="para" weight={600} className="text-black-900 mt-1">
                  {charger.available_start} - {charger.available_end}
                </Typography>
              </div>
              <div className="bg-[#F9F9F9] rounded-xl p-4">
                <Typography variant="chip" className="text-black-500">
                  Price
                </Typography>
                <Typography variant="para" weight={600} className="text-[#365314] mt-1">
                  ₹{charger.price_per_hour}/hr
                </Typography>
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <Typography variant="h4" weight={600} className="text-black-900 mb-3">
                Location
              </Typography>
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <Typography variant="para" className="text-black-800">
                    {charger.address}
                  </Typography>
                  <Typography variant="chip" className="text-black-500 mt-1">
                    Pincode: {charger.pincode}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] sticky top-24">
            <div className="flex items-baseline gap-2 mb-6">
              <Typography variant="h2" weight={600} className="text-[#365314]">
                ₹{charger.price_per_hour}
              </Typography>
              <Typography variant="para" className="text-black-500">
                / hour
              </Typography>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <Typography variant="chip" weight={500} className="text-black-900 mb-2 block">
                Select Date
              </Typography>
              <div className="grid grid-cols-3 gap-2">
                {nextDays.slice(0, 6).map((day) => (
                  <button
                    key={day.value}
                    onClick={() => setSelectedDate(day.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === day.value
                        ? "bg-[#d9f99d] text-[#365314]"
                        : "bg-[#F9F9F9] text-black-700 hover:bg-[#ECF5FF]"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <Link
              href={selectedDate ? `/driver/charger/${charger.id}/book?date=${selectedDate}` : "#"}
              className={!selectedDate ? "pointer-events-none" : ""}
            >
              <Button
                text={selectedDate ? "Continue to Book" : "Select a Date"}
                bg={selectedDate ? "#d9f99d" : "#E5E5E5"}
                color={selectedDate ? "#101010" : "#888888"}
                hoverBg={selectedDate ? "#bef264" : "#E5E5E5"}
                variant="lg"
                className="w-full"
              />
            </Link>

            {/* Info */}
            <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center gap-2 text-black-500">
                <span>⚡</span>
                <Typography variant="chip">
                  Free cancellation up to 1 hour before
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}