"use client";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import HostBookingCard from "@/components/HostBookingCard/HostBookingCard";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetHostBookingsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
} from "@/store/services/bookingApi";
// import { useHostBookingNotifications } from "@/hooks/useBookingNotifications";
// import { useHostBookingRealtime } from "@/hooks/useBookingRealtime";
import { markAsSelfMutated } from "@/lib/realtimeUtils";

type FilterStatus = "all" | "pending" | "confirmed" | "completed" | "cancelled";

export default function HostBookingsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<"accept" | "reject" | null>(null);

  const { data: bookings, isLoading, isError, refetch } = useGetHostBookingsQuery(
    user?.id || "",
    { skip: !user?.id }
  );

  const [acceptBooking] = useAcceptBookingMutation();
  const [rejectBooking] = useRejectBookingMutation();

  // Filter bookings
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    if (filter === "all") return bookings;
    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  // Stats
  const stats = useMemo(() => {
    if (!bookings) return { total: 0, pending: 0, confirmed: 0, earned: 0 };

    let pending = 0;
    let confirmed = 0;
    let earned = 0;

    bookings.forEach((booking) => {
      if (booking.status === "pending") pending++;
      if (booking.status === "confirmed") confirmed++;
      if (booking.status === "confirmed" || booking.status === "completed") {
        earned += booking.total_price;
      }
    });

    return { total: bookings.length, pending, confirmed, earned };
  }, [bookings]);

  const handleAccept = async (bookingId: string) => {
    setProcessingId(bookingId);
    setProcessingAction("accept");
    try {
      markAsSelfMutated(bookingId);
      await acceptBooking(bookingId).unwrap();
      toast.success("Booking accepted! ✅");
    } catch (error) {
      toast.error("Failed to accept booking");
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    if (!confirm("Are you sure you want to reject this booking?")) return;

    setProcessingId(bookingId);
    setProcessingAction("reject");
    try {
      markAsSelfMutated(bookingId);
      await rejectBooking(bookingId).unwrap();
      toast.success("Booking rejected");
    } catch (error) {
      toast.error("Failed to reject booking");
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };

  return (
    <ProtectedRoute allowedRole="host">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <Typography variant="h2" weight={600} className="text-black-900">
                  Booking Requests
                </Typography>
                <Typography variant="para" className="text-black-600 mt-1">
                  Manage bookings on your chargers
                </Typography>
              </div>
              <Link href="/host">
                <Button
                  text="Back to Dashboard"
                  bg="#FFFFFF"
                  color="#365314"
                  hoverBg="#F9F9F9"
                  boxShadow="inset 0 0 0 1px #E5E5E5"
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
              <div className="bg-white rounded-xl p-4 border border-yellow-200">
                <Typography variant="chip" className="text-black-500">
                  Pending
                </Typography>
                <Typography variant="h3" weight={600} className="text-yellow-600 mt-1">
                  {stats.pending}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Confirmed
                </Typography>
                <Typography variant="h3" weight={600} className="text-green-600 mt-1">
                  {stats.confirmed}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Earned
                </Typography>
                <Typography variant="h3" weight={600} className="text-[#365314] mt-1">
                  ₹{stats.earned}
                </Typography>
              </div>
            </div>

            {/* Pending Alert */}
            {stats.pending > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <Typography variant="para" weight={600} className="text-yellow-700">
                    {stats.pending} pending request{stats.pending > 1 ? "s" : ""}
                  </Typography>
                  <Typography variant="chip" className="text-yellow-600">
                    Review and respond to booking requests
                  </Typography>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(["all", "pending", "confirmed", "completed", "cancelled"] as FilterStatus[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${filter === tab
                    ? "bg-[#d9f99d] text-[#365314]"
                    : "bg-white text-black-600 hover:bg-[#F9F9F9] border border-[#E5E5E5]"
                    }`}
                >
                  {tab}
                  {tab === "pending" && stats.pending > 0 && (
                    <span className="ml-1.5 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full">
                      {stats.pending}
                    </span>
                  )}
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
                <div className="text-6xl mb-4">📋</div>
                <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                  No {filter === "all" ? "" : filter} bookings
                </Typography>
                <Typography variant="para" className="text-black-600">
                  {filter === "all"
                    ? "No bookings on your chargers yet"
                    : `You don't have any ${filter} bookings`}
                </Typography>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredBookings.map((booking) => (
                  <HostBookingCard
                    key={booking.id}
                    booking={booking}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    isAccepting={processingId === booking.id && processingAction === "accept"}
                    isRejecting={processingId === booking.id && processingAction === "reject"}
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