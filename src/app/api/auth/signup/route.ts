import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function POST(request: Request) {
  try {
    const { userId, email, name, role } = await request.json();

    // Validate required fields
    if (!userId || !email || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Save user data in database
    await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        role,
      },
    });

    return NextResponse.json(
      { success: true, userId },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}