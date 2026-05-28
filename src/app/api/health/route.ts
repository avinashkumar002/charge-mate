import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  try {
    // Simple database query to keep Supabase active
    await prisma.user.count();
    
    return NextResponse.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      message: "EVSetu is alive"
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      error: "Database connection failed" 
    }, { status: 500 });
  }
}