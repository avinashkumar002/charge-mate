"use client";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";

export default function DriverDashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-12">
        <Container>
          <div className="flex flex-col gap-6">
            <Typography variant="h2" weight={600}>
              Welcome, {user?.name}!
            </Typography>
            <Typography variant="para">
              You're logged in as a <strong>{user?.role}</strong>
            </Typography>
            <Typography variant="para" className="text-black-600">
              This is your Driver Dashboard. You'll be able to find chargers here soon.
            </Typography>
            <div className="w-max">
              <Button
                text="Logout"
                bg="#ef4444"
                color="#FFFFFF"
                hoverBg="#dc2626"
                variant="sm"
                onClick={logout}
              />
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}