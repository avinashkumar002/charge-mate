import { NextResponse } from "next/server";
import { signUp } from "@/lib/supabase/auth";
import { prisma } from "@/lib/prisma/client";
import { signupSchema } from "@/schemas/authSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = signupSchema.parse(body);
    const { email, password, name, role } = validatedData;

    // Create auth user in Supabase
    const { user } = await signUp(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Save user data in our database
    await prisma.user.create({
      data: {
        id: user.id,
        email,
        name,
        role,
      },
    });

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle specific errors
    if (error.message?.includes("already registered")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}