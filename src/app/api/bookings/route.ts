import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { bookingSchema } from "@/schemas/bookingSchema";
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from "@/lib/auth/protectApi";

// POST - Create new booking (driver only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== "driver") return forbiddenResponse("Only drivers can create bookings");

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const { charger_id, booking_date, start_time, end_time } = validatedData;
    const total_price = body.total_price;

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

    // Use authenticated user's ID as driver_id
    const booking = await prisma.booking.create({
      data: {
        charger_id,
        driver_id: authUser.id,
        booking_date: new Date(booking_date),
        start_time,
        end_time,
        total_price,
        status: "pending",
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

// GET - Fetch bookings for a driver (own bookings only)
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get("driverId");
    const status = searchParams.get("status");

    // Can only fetch your own bookings
    if (driverId !== authUser.id) {
      return forbiddenResponse("You can only view your own bookings");
    }

    const where: any = { driver_id: authUser.id };

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
      orderBy: { created_at: "desc" },
    });

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