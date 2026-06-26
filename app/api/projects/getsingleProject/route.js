import connectMongo from "@/lib/db";
import Project from "@/models/projects.model";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ project }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
