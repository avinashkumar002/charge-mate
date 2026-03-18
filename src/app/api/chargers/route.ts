import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { chargerSchema } from "@/schemas/chargerSchema";
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from "@/lib/auth/protectApi";

// POST - Create new charger (host only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();
    if (authUser.role !== "host") return forbiddenResponse("Only hosts can create chargers");

    const body = await request.json();
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
      photo_url,
    } = validatedData;

    const charger = await prisma.charger.create({
      data: {
        host_id: authUser.id,
        title,
        address,
        pincode,
        price_per_hour,
        charger_type,
        power_output,
        available_start,
        available_end,
        photo_url: photo_url || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
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

// GET - Fetch chargers for host
export async function GET(request: NextRequest) {
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