import Link from "next/link";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";

export default function ChargerNotFound() {
  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 border border-[#E5E5E5]">
            <div className="text-6xl mb-4">🔌</div>
            <Typography variant="h3" weight={600} className="text-black-900 mb-2">
              Charger Not Found
            </Typography>
            <Typography variant="para" className="text-black-600 mb-6">
              This charger may have been removed or doesn't exist.
            </Typography>
            <Link href="/driver/search">
              <Button
                text="Find Other Chargers"
                bg="#d9f99d"
                color="#101010"
                hoverBg="#bef264"
                variant="lg"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}