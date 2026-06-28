import connectMongo from "@/lib/db";
import Experience from "@/models/expierence.model";

// GET all experiences
export async function GET() {
  try {
    await connectMongo();
    const experiences = await Experience.find({}).sort({ startDate: -1 }).lean();
    return Response.json({ experiences });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
