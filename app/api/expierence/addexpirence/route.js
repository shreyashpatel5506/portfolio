import connectMongo from "@/lib/db";
import Experience from "@/models/expierence.model";

// POST create experience
export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { company, position, startDate, endDate, description, skills } = body;

    if (!company || !position || !startDate || !description) {
      return Response.json(
        { error: "company, position, startDate, and description are required" },
        { status: 400 }
      );
    }

    const newExperience = new Experience({
      company,
      position,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      description,
      skills: Array.isArray(skills) ? skills : [],
    });

    await newExperience.save();

    return Response.json(
      { message: "Experience added successfully", experience: newExperience },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message || "Failed to add experience" }, { status: 500 });
  }
}
