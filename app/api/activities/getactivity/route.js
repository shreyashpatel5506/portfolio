import connectMongo from "@/lib/db.js";
import activities from "@/models/activity.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongo();
    
    const allActivities = await activities.find().sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      activities: allActivities,
    });
  } catch (error) {
    console.error("Fetch Activities Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
