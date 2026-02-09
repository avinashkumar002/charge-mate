import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { chargerSchema } from "@/schemas/chargerSchema";

// POST - Create new charger
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = chargerSchema.parse(body);

    const {
      title,
      address,
      pincode,
      price_per_hour,
      charger_type,
      power_output,
      available_start,
      available_end,
      photo_url,  // Add this line
    } = validatedData;

    const host_id = body.host_id;

    // Check if host_id is provided
    if (!host_id) {
      return NextResponse.json(
        { error: "Host ID is required" },
        { status: 400 }
      );
    }

    // Create charger in database
    const charger = await prisma.charger.create({
      data: {
        host_id,
        title,
        address,
        pincode,
        price_per_hour,
        charger_type,
        power_output,
        available_start,
        available_end,
        photo_url: photo_url || null,  // Add this line
        status: "active",
      },
    });

    return NextResponse.json(
      { success: true, charger },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Create charger error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create charger" },
      { status: 500 }
    );
  }
}

// GET - Fetch chargers (for host)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hostId = searchParams.get("hostId");

    if (!hostId) {
      return NextResponse.json(
        { error: "Host ID is required" },
        { status: 400 }
      );
    }

    const chargers = await prisma.charger.findMany({
      where: { host_id: hostId },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(chargers, { status: 200 });

  } catch (error) {
    console.error("Fetch chargers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chargers" },
      { status: 500 }
    );
  }
}