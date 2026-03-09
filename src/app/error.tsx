"use client";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6">⚡</div>
          <Typography variant="h2" weight={600} className="text-black-900 mb-2">
            Something Went Wrong
          </Typography>
          <Typography variant="para" className="text-black-500 mb-8">
            An unexpected error occurred. Please try again.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              text="Try Again"
              bg="#d9f99d"
              color="#101010"
              hoverBg="#bef264"
              variant="lg"
              onClick={reset}
            />
            <a href="/">
              <Button
                text="Go Home"
                bg="#FFFFFF"
                color="#365314"
                hoverBg="#F9F9F9"
                boxShadow="inset 0 0 0 1px #E5E5E5"
                variant="lg"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}