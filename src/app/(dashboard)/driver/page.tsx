"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";

export default function DriverDashboard() {
  const { user, loading, logout } = useAuth();

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
          <div className="max-w-5xl mx-auto">
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
                    <div className="w-12 h-12 bg-[#ECF5FF] rounded-full flex items-center justify-center flex-shrink-0">
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
                    <div className="w-12 h-12 bg-[#f5f9f0] rounded-full flex items-center justify-center flex-shrink-0">
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
                  0
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Upcoming
                </Typography>
                <Typography variant="h2" weight={600} className="text-[#2C7FFF] mt-1">
                  0
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Spent
                </Typography>
                <Typography variant="h2" weight={600} className="text-black-900 mt-1">
                  ₹0
                </Typography>
              </div>
            </div>

            {/* Upcoming Bookings (Empty State) */}
            <div className="mt-6 bg-white rounded-2xl p-8 border border-[#E5E5E5]">
              <Typography variant="h3" weight={600} className="text-black-900 mb-4">
                Upcoming Bookings
              </Typography>
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
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}