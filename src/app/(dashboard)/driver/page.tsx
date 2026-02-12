"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import { useGetDriverBookingsQuery } from "@/store/services/bookingApi";

export default function DriverDashboard() {
  const { user, loading, logout } = useAuth();

  const { data: bookings, isLoading: isLoadingBookings } = useGetDriverBookingsQuery(
    user?.id || "",
    { skip: !user?.id }
  );

  // Calculate stats
  const stats = useMemo(() => {
    if (!bookings) return { total: 0, upcoming: 0, spent: 0 };

    const now = new Date();
    let upcoming = 0;
    let spent = 0;

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.booking_date);

      if (["pending", "confirmed"].includes(booking.status) && bookingDate >= now) {
        upcoming++;
      }

      if (booking.status !== "cancelled") {
        spent += booking.total_price;
      }
    });

    return { total: bookings.length, upcoming, spent };
  }, [bookings]);

  // Get upcoming bookings (next 3)
  const upcomingBookings = useMemo(() => {
    if (!bookings) return [];

    const now = new Date();

    return bookings
      .filter((booking) => {
        const bookingDate = new Date(booking.booking_date);
        return ["pending", "confirmed"].includes(booking.status) && bookingDate >= now;
      })
      .sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime())
      .slice(0, 3);
  }, [bookings]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="#365314" />
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <Typography variant="h2" weight={600} className="text-black-900">
                    Welcome, {user?.name}! 👋
                  </Typography>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#d9f99d] text-[#365314] text-sm font-medium rounded-full">
                      Driver
                    </span>
                    <Typography variant="para" className="text-black-600">
                      {user?.email}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    text="Logout"
                    bg="#FFFFFF"
                    color="#365314"
                    hoverBg="#FEE2E2"
                    variant="sm"
                    boxShadow="inset 0 0 0 1px #E5E5E5"
                    onClick={logout}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Find Chargers Card */}
              <Link href="/driver/search" className="block">
                <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ECF5FF] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <div>
                      <Typography variant="h4" weight={600} className="text-black-900">
                        Find Chargers
                      </Typography>
                      <Typography variant="para" className="text-black-600 mt-1">
                        Search for available chargers near you
                      </Typography>
                    </div>
                  </div>
                </div>
              </Link>

              {/* My Bookings Card */}
              <Link href="/driver/bookings" className="block">
                <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f5f9f0] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <Typography variant="h4" weight={600} className="text-black-900">
                        My Bookings
                      </Typography>
                      <Typography variant="para" className="text-black-600 mt-1">
                        View your upcoming and past bookings
                      </Typography>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Stats Card */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Sessions
                </Typography>
                <Typography variant="h2" weight={600} className="text-black-900 mt-1">
                  {isLoadingBookings ? "-" : stats.total}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Upcoming
                </Typography>
                <Typography variant="h2" weight={600} className="text-[#2C7FFF] mt-1">
                  {isLoadingBookings ? "-" : stats.upcoming}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Spent
                </Typography>
                <Typography variant="h2" weight={600} className="text-[#365314] mt-1">
                  {isLoadingBookings ? "-" : `₹${stats.spent}`}
                </Typography>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="mt-6 bg-white rounded-2xl p-8 border border-[#E5E5E5]">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h3" weight={600} className="text-black-900">
                  Upcoming Bookings
                </Typography>
                {upcomingBookings.length > 0 && (
                  <Link href="/driver/bookings" className="text-[#2C7FFF] text-sm hover:underline">
                    View all
                  </Link>
                )}
              </div>

              {isLoadingBookings ? (
                <div className="flex justify-center py-8">
                  <Spinner size="md" color="#365314" />
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">📅</div>
                  <Typography variant="para" className="text-black-500 mb-4">
                    No upcoming bookings
                  </Typography>
                  <Link href="/driver/search">
                    <Button
                      text="Find a Charger"
                      bg="#d9f99d"
                      color="#101010"
                      hoverBg="#bef264"
                      variant="sm"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {upcomingBookings.map((booking) => {
                    const bookingDate = new Date(booking.booking_date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    });

                    return (
                      <Link
                        key={booking.id}
                        href={`/driver/bookings/${booking.id}`}
                        className="flex items-center gap-4 p-4 bg-[#F9F9F9] rounded-xl hover:bg-[#f5f9f0] transition-colors"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                          {booking.charger?.photo_url ? (
                            <Image
                              src={booking.charger.photo_url}
                              alt={booking.charger.title || "Charger"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl">🔌</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Typography variant="para" weight={600} className="text-black-900 truncate">
                            {booking.charger?.title || "Charger"}
                          </Typography>
                          <div className="flex items-center gap-3 mt-1">
                            <Typography variant="chip" className="text-black-500">
                              📅 {bookingDate}
                            </Typography>
                            <Typography variant="chip" className="text-black-500">
                              ⏰ {booking.start_time} - {booking.end_time}
                            </Typography>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Typography variant="para" weight={600} className="text-[#365314]">
                            ₹{booking.total_price}
                          </Typography>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full capitalize">
                            {booking.status}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}