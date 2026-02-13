import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

// GET - Fetch bookings for a host's chargers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hostId = searchParams.get("hostId");
    const status = searchParams.get("status");

    if (!hostId) {
      return NextResponse.json(
        { error: "Host ID is required" },
        { status: 400 }
      );
    }

    const where: any = {
      charger: {
        host_id: hostId,
      },
    };

    if (status) {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        charger: {
          select: {
            id: true,
            title: true,
            address: true,
            photo_url: true,
            price_per_hour: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { created_at: "desc" },
      ],
    });

    // Serialize dates
    const serializedBookings = bookings.map((booking) => ({
      ...booking,
      booking_date: booking.booking_date.toISOString(),
      created_at: booking.created_at.toISOString(),
    }));

    return NextResponse.json(serializedBookings, { status: 200 });

  } catch (error) {
    console.error("Fetch host bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}