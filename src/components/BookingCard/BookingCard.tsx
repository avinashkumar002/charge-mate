"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import type { Booking } from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const bookingDate = new Date(booking.booking_date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const canCancel = ["pending", "confirmed"].includes(booking.status);

  // Check if booking is upcoming
  const isUpcoming = () => {
    const bookingDateTime = new Date(booking.booking_date);
    const [hours] = booking.start_time.split(":");
    bookingDateTime.setHours(parseInt(hours), 0, 0, 0);
    return bookingDateTime > new Date();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] hover:border-[#d9f99d] transition-colors">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-36 md:h-auto bg-[#F9F9F9] shrink-0">
          {booking.charger?.photo_url ? (
            <Image
              src={booking.charger.photo_url}
              alt={booking.charger.title || "Charger"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">🔌</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col gap-3">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <Typography variant="h4" weight={600} className="text-black-900">
                {booking.charger?.title || "Charger"}
              </Typography>
              <Typography variant="chip" className="text-black-500 mt-1">
                {booking.charger?.address}
              </Typography>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-black-600">
              <span>📅</span>
              <Typography variant="chip">{bookingDate}</Typography>
            </div>
            <div className="flex items-center gap-2 text-black-600">
              <span>⏰</span>
              <Typography variant="chip">
                {booking.start_time} - {booking.end_time}
              </Typography>
            </div>
            <div className="flex items-center gap-2 text-[#365314]">
              <span>💰</span>
              <Typography variant="chip" weight={600}>
                ₹{booking.total_price}
              </Typography>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto pt-2">
            <Link href={`/driver/bookings/${booking.id}`}>
              <Button
                text="View Details"
                bg="#FFFFFF"
                color="#365314"
                hoverBg="#F9F9F9"
                boxShadow="inset 0 0 0 1px #E5E5E5"
                variant="sm"
              />
            </Link>

            {canCancel && isUpcoming() && (
              <Button
                text={isCancelling ? "Cancelling..." : "Cancel"}
                bg="#FFFFFF"
                color="#DC2626"
                hoverBg="#FEE2E2"
                boxShadow="inset 0 0 0 1px #E5E5E5"
                variant="sm"
                onClick={() => onCancel?.(booking.id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(BookingCard);