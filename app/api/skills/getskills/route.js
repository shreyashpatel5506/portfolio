import connectMongo from "@/lib/db";
import Skills from "@/models/skills.model";

export async function GET() {
  try {
    await connectMongo();

    const skills = await Skills.find({}).sort({ createdAt: 1 }).lean();

    return Response.json({
      skills,
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
