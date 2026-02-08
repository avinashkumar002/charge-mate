"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";

export default function HostDashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="#365314" />
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRole="host">
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
                      Host
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

            {/* Add Charger Card */}
            <div className="mt-6 bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-[#ECF5FF] rounded-full flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <Typography variant="h3" weight={600} className="text-black-900">
                  List Your Charger
                </Typography>
                <Typography variant="para" className="text-black-600 max-w-md">
                  Start earning by sharing your EV charger with drivers in your area.
                </Typography>
                <Link href="/host/add-charger">
                  <Button
                    text="Add Charger"
                    bg="#d9f99d"
                    color="#101010"
                    hoverBg="#bef264"
                    variant="lg"
                    className="mt-2"
                  />
                </Link>
              </div>
            </div>

            {/* My Chargers Section (Empty State) */}
            <div className="mt-6 bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5]">
              <Typography variant="h3" weight={600} className="text-black-900 mb-4">
                My Chargers
              </Typography>
              <div className="text-center py-8 text-black-500">
                <Typography variant="para">
                  No chargers listed yet. Add your first charger to start earning!
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}