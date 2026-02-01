// src/app/api/submit-waitlist/route.ts  

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log("Submitting to Google Sheets:", body);

    // Use environment variable for the URL
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      throw new Error("GOOGLE_APPS_SCRIPT_URL environment variable is not set");
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: 'follow'
    });

    console.log("Response status:", response.status);

    const contentType = response.headers.get("content-type") || "";
    
    if (!response.ok) {
      const text = await response.text();
      console.error("Apps Script error response:", text);
      throw new Error(`Apps Script returned status ${response.status}`);
    }

    let result;
    if (contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response from Apps Script:", text);
      
      // Sometimes Apps Script returns HTML on success
      if (text.includes("success")) {
        result = { success: true };
      } else {
        throw new Error("Apps Script did not return JSON");
      }
    }

    console.log("Apps Script result:", result);

    if (!result.success) {
      throw new Error(result.error || "Unknown error from Apps Script");
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/submit-waitlist:", err);
    return NextResponse.json(
      { 
        success: false, 
        error: err instanceof Error ? err.message : "Failed to submit form"
      },
      { status: 500 }
    );
  }
}