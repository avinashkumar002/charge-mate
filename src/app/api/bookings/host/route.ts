import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from "@/lib/auth/protectApi";

// GET - Fetch bookings for a host's chargers
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== "host") return forbiddenResponse("Only hosts can view host bookings");

    const { searchParams } = new URL(request.url);
    const hostId = searchParams.get("hostId");
    const status = searchParams.get("status");

    // Can only fetch your own charger bookings
    if (hostId !== authUser.id) {
      return forbiddenResponse("You can only view your own charger bookings");
    }

    const where: any = {
      charger: {
        host_id: authUser.id,
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
      orderBy: { created_at: "desc" },
    });

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