import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { bookingSchema } from "@/schemas/bookingSchema";

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = bookingSchema.parse(body);

    const { charger_id, booking_date, start_time, end_time } = validatedData;
    const driver_id = body.driver_id;
    const total_price = body.total_price;

    if (!driver_id) {
      return NextResponse.json(
        { error: "Driver ID is required" },
        { status: 400 }
      );
    }

    // Check if charger exists and is active
    const charger = await prisma.charger.findUnique({
      where: { id: charger_id },
    });

    if (!charger) {
      return NextResponse.json(
        { error: "Charger not found" },
        { status: 404 }
      );
    }

    if (charger.status !== "active") {
      return NextResponse.json(
        { error: "Charger is not available" },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const existingBooking = await prisma.booking.findFirst({
      where: {
        charger_id,
        booking_date: new Date(booking_date),
        status: { in: ["pending", "confirmed"] },
        OR: [
          {
            AND: [
              { start_time: { lte: start_time } },
              { end_time: { gt: start_time } },
            ],
          },
          {
            AND: [
              { start_time: { lt: end_time } },
              { end_time: { gte: end_time } },
            ],
          },
          {
            AND: [
              { start_time: { gte: start_time } },
              { end_time: { lte: end_time } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        charger_id,
        driver_id,
        booking_date: new Date(booking_date),
        start_time,
        end_time,
        total_price,
        status: "confirmed",
      },
      include: {
        charger: {
          select: {
            id: true,
            title: true,
            address: true,
            photo_url: true,
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

    return NextResponse.json(
      { success: true, booking },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Create booking error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid booking data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET - Fetch bookings for a driver
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get("driverId");
    const status = searchParams.get("status");

    if (!driverId) {
      return NextResponse.json(
        { error: "Driver ID is required" },
        { status: 400 }
      );
    }

    const where: any = { driver_id: driverId };

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
            host: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        { booking_date: "desc" },
        { start_time: "desc" },
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
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}