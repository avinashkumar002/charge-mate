import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma/client";
import Container from "@/components/Container/Container";
import ChargerDetailsClient from "./ChargerDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  const charger = await prisma.charger.findUnique({
    where: { id },
    select: { title: true, address: true, price_per_hour: true },
  });

  if (!charger) {
    return {
      title: "Charger Not Found | ChargeMate",
    };
  }

  return {
    title: `${charger.title} | ChargeMate`,
    description: `Book EV charging at ${charger.address}. ₹${charger.price_per_hour}/hour.`,
    openGraph: {
      title: charger.title,
      description: `Book EV charging at ${charger.address}`,
    },
  };
}

export default async function ChargerDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const charger = await prisma.charger.findUnique({
    where: { id },
    include: {
      host: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!charger) {
    notFound();
  }

  // Serialize for client component (convert Date to string)
  const serializedCharger = {
    ...charger,
    created_at: charger.created_at.toISOString(),
  };

  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA]">
      <Container>
        <ChargerDetailsClient charger={serializedCharger} />
      </Container>
    </section>
  );
}