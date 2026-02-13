import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

// GET - Fetch single booking
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
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

    // Serialize dates
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

// PUT - Update booking status (cancel)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
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