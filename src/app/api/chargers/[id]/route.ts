import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { chargerSchema } from "@/schemas/chargerSchema";

// GET - Fetch single charger with host info
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
      return NextResponse.json(
        { error: "Charger not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(charger, { status: 200 });

  } catch (error) {
    console.error("Fetch charger error:", error);
    return NextResponse.json(
      { error: "Failed to fetch charger" },
      { status: 500 }
    );
  }
}

// PUT - Update charger
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
    } = validatedData;

    const photo_url = body.photo_url || null;

    const charger = await prisma.charger.update({
      where: { id },
      data: {
        title,
        address,
        pincode,
        price_per_hour,
        charger_type,
        power_output,
        available_start,
        available_end,
        photo_url,
      },
    });

    return NextResponse.json(
      { success: true, charger },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Update charger error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Charger not found" },
        { status: 404 }
      );
    }

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update charger" },
      { status: 500 }
    );
  }
}

// DELETE - Delete charger
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.charger.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Charger deleted" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Delete charger error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Charger not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete charger" },
      { status: 500 }
    );
  }
}