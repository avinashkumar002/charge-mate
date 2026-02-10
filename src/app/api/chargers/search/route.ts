import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const pincode = searchParams.get("pincode");
    const charger_type = searchParams.get("charger_type");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const min_power = searchParams.get("min_power");

    // Build dynamic where clause
    const where: any = {
      status: "active", // Only show active chargers
    };

    if (pincode) {
      where.pincode = {
        startsWith: pincode, // Match partial pincode
      };
    }

    if (charger_type) {
      where.charger_type = charger_type;
    }

    if (min_price || max_price) {
      where.price_per_hour = {};
      if (min_price) where.price_per_hour.gte = parseInt(min_price);
      if (max_price) where.price_per_hour.lte = parseInt(max_price);
    }

    if (min_power) {
      where.power_output = {
        gte: parseFloat(min_power),
      };
    }

    const chargers = await prisma.charger.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(chargers, { status: 200 });

  } catch (error) {
    console.error("Search chargers error:", error);
    return NextResponse.json(
      { error: "Failed to search chargers" },
      { status: 500 }
    );
  }
}