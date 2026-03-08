import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from "@/lib/auth/protectApi";

// GET - Fetch single booking (driver or host only)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();

    const { id } = await context.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        charger: {
          select: {
            id: true,
            title: true,
            address: true,
            photo_url: true,
            price_per_hour: true,
            host_id: true,
            host: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Only the driver or charger's host can view
    if (booking.driver_id !== authUser.id && booking.charger.host_id !== authUser.id) {
      return forbiddenResponse("You don't have access to this booking");
    }

    const serializedBooking = {
      ...booking,
      booking_date: booking.booking_date.toISOString(),
      created_at: booking.created_at.toISOString(),
    };

    return NextResponse.json(serializedBooking, { status: 200 });

  } catch (error) {
    console.error("Fetch booking error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PUT - Update booking status
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();

    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Fetch booking with charger to check ownership
    const existing = await prisma.booking.findUnique({
      where: { id },
      include: {
        charger: { select: { host_id: true } },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const isDriver = existing.driver_id === authUser.id;
    const isHost = existing.charger.host_id === authUser.id;

    // Permission checks
    if (status === "confirmed" && !isHost) {
      return forbiddenResponse("Only the host can accept bookings");
    }

    if (status === "cancelled" && !isDriver && !isHost) {
      return forbiddenResponse("You don't have access to this booking");
    }

    if (status === "completed" && !isHost) {
      return forbiddenResponse("Only the host can mark bookings as completed");
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      { success: true, booking },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Update booking error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}