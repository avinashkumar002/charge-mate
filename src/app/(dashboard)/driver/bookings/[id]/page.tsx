"use client";
import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useGetBookingByIdQuery, useCancelBookingMutation } from "@/store/services/bookingApi";
import toast from "react-hot-toast";
// import { useDriverBookingRealtime } from "@/hooks/useBookingRealtime";
import { useAuth } from "@/hooks/useAuth";
import { markAsSelfMutated } from "@/lib/realtimeUtils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";
  const { user } = useAuth();

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(id);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();


  const handleCancel = async () => {
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  try {
    markAsSelfMutated(id);
    await cancelBooking(id).unwrap();
    toast.success("Booking cancelled");
    router.push("/driver/bookings");
  } catch (error) {
    toast.error("Failed to cancel booking");
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="#365314" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 border border-[#E5E5E5]">
              <div className="text-6xl mb-4">😕</div>
              <Typography variant="h3" weight={600} className="text-black-900 mb-2">
                Booking Not Found
              </Typography>
              <Link href="/driver/bookings">
                <Button
                  text="View All Bookings"
                  bg="#d9f99d"
                  color="#101010"
                  hoverBg="#bef264"
                  variant="lg"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const bookingDate = new Date(booking.booking_date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const canCancel = ["pending", "confirmed"].includes(booking.status);

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Success Banner (for new bookings) */}
            {isNew && booking.status === "confirmed" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <Typography variant="para" weight={600} className="text-green-700">
                    Booking Confirmed!
                  </Typography>
                  <Typography variant="chip" className="text-green-600">
                    Your charging session has been booked successfully.
                  </Typography>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <Typography variant="h2" weight={600} className="text-black-900">
                  Booking Details
                </Typography>
                <Typography variant="chip" className="text-black-500 mt-1">
                  Booking ID: {booking.id.slice(0, 8)}...
                </Typography>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColors[booking.status]}`}>
                {booking.status}
              </span>
            </div>

            {/* Charger Card */}
            {booking.charger && (
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] mb-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#F9F9F9] shrink-0">
                    {booking.charger.photo_url ? (
                      <Image
                        src={booking.charger.photo_url}
                        alt={booking.charger.title}
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
                      {booking.charger.title}
                    </Typography>
                    <Typography variant="chip" className="text-black-500 mt-1">
                      {booking.charger.address}
                    </Typography>
                    {booking.charger.host && (
                      <Typography variant="chip" className="text-black-400 mt-1">
                        Hosted by {booking.charger.host.name}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Booking Details Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5] mb-6">
              <Typography variant="h4" weight={600} className="text-black-900 mb-4">
                Session Details
              </Typography>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📅</span>
                    <Typography variant="para" className="text-black-600">
                      Date
                    </Typography>
                  </div>
                  <Typography variant="para" weight={600} className="text-black-900">
                    {bookingDate}
                  </Typography>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⏰</span>
                    <Typography variant="para" className="text-black-600">
                      Time
                    </Typography>
                  </div>
                  <Typography variant="para" weight={600} className="text-black-900">
                    {booking.start_time} - {booking.end_time}
                  </Typography>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <Typography variant="para" className="text-black-600">
                      Duration
                    </Typography>
                  </div>
                  <Typography variant="para" weight={600} className="text-black-900">
                    {parseInt(booking.end_time) - parseInt(booking.start_time)} hour(s)
                  </Typography>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Typography variant="h4" weight={600} className="text-black-900">
                    Total Amount
                  </Typography>
                  <Typography variant="h3" weight={600} className="text-[#365314]">
                    ₹{booking.total_price}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/driver/bookings" className="flex-1">
                <Button
                  text="View All Bookings"
                  bg="#FFFFFF"
                  color="#365314"
                  hoverBg="#F9F9F9"
                  boxShadow="inset 0 0 0 1px #E5E5E5"
                  variant="lg"
                  className="w-full"
                />
              </Link>

              {canCancel && (
                <Button
                  text={isCancelling ? "Cancelling..." : "Cancel Booking"}
                  bg="#FFFFFF"
                  color="#DC2626"
                  hoverBg="#FEE2E2"
                  boxShadow="inset 0 0 0 1px #E5E5E5"
                  variant="lg"
                  className="flex-1"
                  onClick={handleCancel}
                  icon={isCancelling ? <Spinner size="sm" color="#DC2626" /> : undefined}
                />
              )}
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}