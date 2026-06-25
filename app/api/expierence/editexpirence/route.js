import connectMongo from "@/lib/mongodb";
import experience from "@/models/expierence.model";

export async function PUT(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { id, company, position, startDate, endDate, description, skills } =
      body;
    const updatedExperience = await experience.findByIdAndUpdate(
      id,
      {
        company,
        position,
        startDate,
        endDate,
        description,
        skills,
      },
      { new: true },
    );
    return new Response(
      JSON.stringify({
        message: "Experience updated successfully",
        experience: updatedExperience,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update experience" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
