import { NextResponse } from "next/server";
import connectMongo from "@/app/db";
import Contribution from "@/app/model/Contribution";


/* ================= GET ================= */
export async function GET() {
  try {
    await connectMongo();

    const items = await Contribution.find().sort({ createdAt: -1 });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(request) {
  try {
    await connectMongo();

    const body = await request.json();

    const newItem = await Contribution.create({
      title: body.title || "Untitled",
      type: body.type || "Open Source",
      description: body.description || "",
      githubUrl: body.githubUrl || "",
      websiteUrl: body.websiteUrl || "",
      notes: body.notes || [],
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create contribution" },
      { status: 500 }
    );
  }
}
