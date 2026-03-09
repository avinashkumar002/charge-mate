"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import ChargerCard from "@/components/ChargerCard/ChargerCard";
import { authFetch } from "@/lib/auth/authFetch";
import { useGetHostBookingsQuery } from "@/store/services/bookingApi";

interface Charger {
  id: string;
  title: string;
  address: string;
  pincode: string;
  price_per_hour: number;
  charger_type: string;
  power_output: number;
  available_start: string;
  available_end: string;
  status: string;
}

export default function HostDashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [isLoadingChargers, setIsLoadingChargers] = useState(true);

  // Live booking stats via RTK Query (auto-updates via Realtime)
const { data: bookings } = useGetHostBookingsQuery(
  user?.id || "",
  { skip: !user?.id }
);

const pendingCount = bookings?.filter((b) => b.status === "pending").length || 0;
const totalBookings = bookings?.length || 0;
const totalEarned = bookings
  ?.filter((b) => b.status === "confirmed" || b.status === "completed")
  .reduce((sum, b) => sum + b.total_price, 0) || 0;

  // Fetch chargers when user is loaded
  useEffect(() => {
    if (user?.id) {
      fetchChargers();
    }
  }, [user?.id]);

  async function fetchChargers() {
    try {
      const response = await fetch(`/api/chargers?hostId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setChargers(data);
      }
    } catch (error) {
      console.error("Error fetching chargers:", error);
    } finally {
      setIsLoadingChargers(false);
    }
  }

  async function handleDelete(chargerId: string) {
    if (!confirm("Are you sure you want to delete this charger?")) {
      return;
    }

    try {
      const response = await authFetch(`/api/chargers/${chargerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setChargers(chargers.filter(c => c.id !== chargerId));
      } else {
        alert("Failed to delete charger");
      }
    } catch (error) {
      console.error("Error deleting charger:", error);
      alert("Failed to delete charger");
    }
  }

  function handleEdit(chargerId: string) {
    router.push(`/host/edit-charger/${chargerId}`);
  }

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
                      Host
                    </span>
                    <Typography variant="para" className="text-black-600">
                      {user?.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href="/host/bookings">
                    <Button
                      text="📋 Bookings"
                      bg="#FFFFFF"
                      color="#365314"
                      hoverBg="#F9F9F9"
                      boxShadow="inset 0 0 0 1px #E5E5E5"
                      variant="sm"
                    />
                  </Link>
                  <Link href="/host/add-charger">
                    <Button
                      text="+ Add Charger"
                      bg="#d9f99d"
                      color="#101010"
                      hoverBg="#bef264"
                      variant="sm"
                    />
                  </Link>
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

            {/* Stats Card */}
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Chargers
                </Typography>
                <Typography variant="h2" weight={600} className="text-black-900 mt-1">
                  {chargers.length}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Active
                </Typography>
                <Typography variant="h2" weight={600} className="text-green-600 mt-1">
                  {chargers.filter(c => c.status === "active").length}
                </Typography>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
                <Typography variant="chip" className="text-black-500">
                  Total Bookings
                </Typography>
                <Typography variant="h2" weight={600} className="text-black-900 mt-1">
                  0
                </Typography>
              </div>
            </div> */}
            {/* Pending Alert */}
{pendingCount > 0 && (
  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className="text-2xl">⏳</span>
      <div>
        <Typography variant="para" weight={600} className="text-yellow-700">
          {pendingCount} pending request{pendingCount > 1 ? "s" : ""}
        </Typography>
        <Typography variant="chip" className="text-yellow-600">
          Review and respond to requests
        </Typography>
      </div>
    </div>
    <Link href="/host/bookings">
      <Button
        text="View"
        bg="#FFFFFF"
        color="#365314"
        hoverBg="#F9F9F9"
        boxShadow="inset 0 0 0 1px #E5E5E5"
        variant="sm"
      />
    </Link>
  </div>
)}

{/* Stats Card */}
<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
    <Typography variant="chip" className="text-black-500">
      Total Chargers
    </Typography>
    <Typography variant="h2" weight={600} className="text-black-900 mt-1">
      {chargers.length}
    </Typography>
  </div>
  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
    <Typography variant="chip" className="text-black-500">
      Active
    </Typography>
    <Typography variant="h2" weight={600} className="text-green-600 mt-1">
      {chargers.filter(c => c.status === "active").length}
    </Typography>
  </div>
  <Link href="/host/bookings">
    <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] hover:border-[#d9f99d] transition-colors cursor-pointer h-full">
      <Typography variant="chip" className="text-black-500">
        Total Bookings
      </Typography>
      <Typography variant="h2" weight={600} className="text-black-900 mt-1">
        {totalBookings}
      </Typography>
    </div>
  </Link>
  <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
    <Typography variant="chip" className="text-black-500">
      Total Earned
    </Typography>
    <Typography variant="h2" weight={600} className="text-[#365314] mt-1">
      ₹{totalEarned}
    </Typography>
  </div>
</div>

            {/* My Chargers Section */}
            <div className="mt-6">
              <Typography variant="h3" weight={600} className="text-black-900 mb-4">
                My Chargers
              </Typography>

              {isLoadingChargers ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" color="#365314" />
                </div>
              ) : chargers.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] text-center">
                  <div className="w-16 h-16 bg-[#ECF5FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <Typography variant="h4" weight={600} className="text-black-900">
                    No Chargers Yet
                  </Typography>
                  <Typography variant="para" className="text-black-600 mt-2 mb-4">
                    Add your first charger to start earning!
                  </Typography>
                  <Link href="/host/add-charger">
                    <Button
                      text="Add Your First Charger"
                      bg="#d9f99d"
                      color="#101010"
                      hoverBg="#bef264"
                      variant="lg"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {chargers.map((charger) => (
                    <ChargerCard
                      key={charger.id}
                      charger={charger}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}