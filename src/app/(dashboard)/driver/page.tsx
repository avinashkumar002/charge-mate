"use client";
import { useAuth } from "@/hooks/useAuth";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";

export default function DriverDashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h3">Loading...</Typography>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h3">Please login</Typography>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12">
      <Container>
        <div className="flex flex-col gap-6">
          <Typography variant="h2" weight={600}>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="para">
            You're logged in as a <strong>{user.role}</strong>
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
  );
}