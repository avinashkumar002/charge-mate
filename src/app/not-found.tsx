"use client";
import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import { useAuth } from "@/hooks/useAuth";

export default function NotFound() {
  const { user, isAuthenticated } = useAuth();

  const dashboardLink = user?.role === "host" ? "/host" : "/driver";

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6">🔌</div>
          <Typography variant="h1" weight={600} className="text-black-900 mb-2">
            404
          </Typography>
          <Typography variant="h3" weight={500} className="text-black-700 mb-4">
            Page Not Found
          </Typography>
          <Typography variant="para" className="text-black-500 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button
                text="Go Home"
                bg="#d9f99d"
                color="#101010"
                hoverBg="#bef264"
                variant="lg"
              />
            </Link>
            <Link href={isAuthenticated ? dashboardLink : "/login"}>
              <Button
                text={isAuthenticated ? "Go to Dashboard" : "Login"}
                bg="#FFFFFF"
                color="#365314"
                hoverBg="#F9F9F9"
                boxShadow="inset 0 0 0 1px #E5E5E5"
                variant="lg"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}