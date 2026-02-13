"use client";
import { memo } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import type { Booking } from "@/types/booking";

interface HostBookingCardProps {
  booking: Booking;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  isAccepting?: boolean;
  isRejecting?: boolean;
}

function HostBookingCard({
  booking,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}: HostBookingCardProps) {
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

  const isPending = booking.status === "pending";
  const isProcessing = isAccepting || isRejecting;

  // Time since booking was created
  const timeAgo = () => {
    const now = new Date();
    const created = new Date(booking.created_at);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden border transition-colors ${
      isPending ? "border-yellow-300 shadow-sm" : "border-[#E5E5E5]"
    }`}>
      <div className="flex flex-col md:flex-row">
        {/* Charger Image */}
        <div className="relative w-full md:w-44 h-32 md:h-auto bg-[#F9F9F9] shrink-0">
          {booking.charger?.photo_url ? (
            <Image
              src={booking.charger.photo_url}
              alt={booking.charger.title || "Charger"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🔌</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col gap-3">
          {/* Header Row */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <Typography variant="h4" weight={600} className="text-black-900">
                {booking.charger?.title || "Charger"}
              </Typography>
              <Typography variant="chip" className="text-black-400 mt-0.5">
                {timeAgo()}
              </Typography>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${statusColors[booking.status]}`}>
              {booking.status}
            </span>
          </div>

          {/* Driver Info */}
          {booking.driver && (
            <div className="flex items-center gap-2 bg-[#F9F9F9] rounded-lg px-3 py-2">
              <span className="text-lg">👤</span>
              <div>
                <Typography variant="chip" weight={600} className="text-black-900">
                  {booking.driver.name}
                </Typography>
                <Typography variant="chip" className="text-black-500">
                  {booking.driver.email}
                </Typography>
              </div>
            </div>
          )}

          {/* Booking Details */}
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

          {/* Action Buttons — only for pending */}
          {isPending && (
            <div className="flex gap-3 mt-auto pt-2">
              <Button
                text={isAccepting ? "Accepting..." : "Accept"}
                bg="#d9f99d"
                color="#365314"
                hoverBg="#bef264"
                variant="sm"
                className={isProcessing ? "opacity-70 cursor-not-allowed" : ""}
                onClick={() => onAccept?.(booking.id)}
                icon={isAccepting ? <Spinner size="sm" color="#365314" /> : undefined}
                iconPosition="left"
              />
              <Button
                text={isRejecting ? "Rejecting..." : "Reject"}
                bg="#FFFFFF"
                color="#DC2626"
                hoverBg="#FEE2E2"
                boxShadow="inset 0 0 0 1px #E5E5E5"
                variant="sm"
                className={isProcessing ? "opacity-70 cursor-not-allowed" : ""}
                onClick={() => onReject?.(booking.id)}
                icon={isRejecting ? <Spinner size="sm" color="#DC2626" /> : undefined}
                iconPosition="left"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(HostBookingCard);