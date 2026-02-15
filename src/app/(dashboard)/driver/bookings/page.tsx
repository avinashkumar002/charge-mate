"use client";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import BookingCard from "@/components/BookingCard/BookingCard";
import { useAuth } from "@/hooks/useAuth";
import { useGetDriverBookingsQuery, useCancelBookingMutation } from "@/store/services/bookingApi";
// import { useDriverBookingNotifications } from "@/hooks/useBookingNotifications";
// import { useDriverBookingRealtime } from "@/hooks/useBookingRealtime";
import { markAsSelfMutated } from "@/lib/realtimeUtils";


type FilterStatus = "all" | "upcoming" | "completed" | "cancelled";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const { data: bookings, isLoading, isError, refetch } = useGetDriverBookingsQuery(
  user?.id || "",
  { skip: !user?.id }
);

  const [cancelBooking] = useCancelBookingMutation();

  // Filter bookings based on selected filter
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];

    const now = new Date();

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.booking_date);
      const [hours] = booking.start_time.split(":");
      bookingDate.setHours(parseInt(hours), 0, 0, 0);

      switch (filter) {
        case "upcoming":
          return (
            ["pending", "confirmed"].includes(booking.status) &&
            bookingDate > now
          );
        case "completed":
          return booking.status === "completed" || bookingDate < now;
        case "cancelled":
          return booking.status === "cancelled";
        default:
          return true;
      }
    });
  }, [bookings, filter]);

  const handleCancel = async (bookingId: string) => {
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  setCancellingId(bookingId);
  try {
    markAsSelfMutated(bookingId);
    await cancelBooking(bookingId).unwrap();
    toast.success("Booking cancelled");
  } catch (error) {
    toast.error("Failed to cancel booking");
  } finally {
    setCancellingId(null);
  }
};

  // Stats
  const stats = useMemo(() => {
    if (!bookings) return { total: 0, upcoming: 0, completed: 0, spent: 0 };

    const now = new Date();
    let upcoming = 0;
    let completed = 0;
    let spent = 0;

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.booking_date);

      if (["pending", "confirmed"].includes(booking.status) && bookingDate > now) {
        upcoming++;
      }

      if (booking.status === "completed" || (booking.status === "confirmed" && bookingDate < now)) {
        completed++;
        spent += booking.total_price;
      }
    });

    return { total: bookings.length, upcoming, completed, spent };
  }, [bookings]);

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <Typography variant="h2" weight={600} className="text-black-900">
                  My Bookings
                </Typography>
                <Typography variant="para" className="text-black-600 mt-1">
                  View and manage your charging sessions
                </Typography>
              </div>
              <Link href="/driver/search">
                <Button
                  text="Find Chargers"
                  bg="#d9f99d"
                  color="#101010"
                  hoverBg="#bef264"
                  variant="sm"
                />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Bookings
                </Typography>
                <Typography variant="h3" weight={600} className="text-black-900 mt-1">
                  {stats.total}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Upcoming
                </Typography>
                <Typography variant="h3" weight={600} className="text-[#2C7FFF] mt-1">
                  {stats.upcoming}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Completed
                </Typography>
                <Typography variant="h3" weight={600} className="text-green-600 mt-1">
                  {stats.completed}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Spent
                </Typography>
                <Typography variant="h3" weight={600} className="text-[#365314] mt-1">
                  ₹{stats.spent}
                </Typography>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(["all", "upcoming", "completed", "cancelled"] as FilterStatus[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${filter === tab
                    ? "bg-[#d9f99d] text-[#365314]"
                    : "bg-white text-black-600 hover:bg-[#F9F9F9] border border-[#E5E5E5]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" color="#365314" />
              </div>
            ) : isError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <Typography variant="h4" className="text-red-600 mb-2">
                  Failed to load bookings
                </Typography>
                <button
                  onClick={() => refetch()}
                  className="text-[#2C7FFF] hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                  No {filter === "all" ? "" : filter} bookings
                </Typography>
                <Typography variant="para" className="text-black-600 mb-4">
                  {filter === "all"
                    ? "You haven't made any bookings yet"
                    : `You don't have any ${filter} bookings`}
                </Typography>
                <Link href="/driver/search">
                  <Button
                    text="Find a Charger"
                    bg="#d9f99d"
                    color="#101010"
                    hoverBg="#bef264"
                    variant="lg"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancel}
                    isCancelling={cancellingId === booking.id}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}