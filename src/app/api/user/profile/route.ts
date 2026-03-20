import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth/protectApi";

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();

    const body = await request.json();
    const { name, phone } = body;

    // Validate name
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Phone must be a valid 10-digit number" },
        { status: 400 }
      );
    }

    // Check if phone is already taken by another user
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });

      if (existingPhone && existingPhone.id !== authUser.id) {
        return NextResponse.json(
          { error: "This phone number is already registered" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        name: name.trim(),
        phone: phone || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        created_at: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          ...updatedUser,
          created_at: updatedUser.created_at.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// GET - Get full profile
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) return unauthorizedResponse();

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...user,
        created_at: user.created_at.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}