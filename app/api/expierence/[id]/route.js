import connectMongo from "@/lib/db";
import Experience from "@/models/expierence.model";

// PUT update experience
export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const body = await req.json();
    const { company, position, startDate, endDate, description, skills } = body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      {
        company,
        position,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        description,
        skills: Array.isArray(skills) ? skills : [],
      },
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return Response.json({ error: "Experience not found" }, { status: 404 });
    }

    return Response.json({
      message: "Experience updated successfully",
      experience: updatedExperience,
    });
  } catch (error) {
    return Response.json({ error: error.message || "Failed to update experience" }, { status: 500 });
  }
}

// DELETE experience
export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Experience not found" }, { status: 404 });
    }
    return Response.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
