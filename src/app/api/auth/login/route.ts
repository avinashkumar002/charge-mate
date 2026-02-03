import { NextResponse } from "next/server";
import { signIn } from "@/lib/supabase/auth";
import { prisma } from "@/lib/prisma/client";
import { loginSchema } from "@/schemas/authSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;

    // Sign in with Supabase Auth
    const { user } = await signIn(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get user data from database to check role
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true, name: true },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        userId: user.id,
        role: userData.role,
        name: userData.name,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.message?.includes("Invalid login credentials")) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}