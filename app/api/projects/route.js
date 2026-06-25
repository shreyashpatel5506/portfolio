import connectMongo from "@/lib/db.js";
import projects from "@/models/projects.model";

export async function GET(req) {
  try {
    await connectMongo();

    // 1. Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 3;

    // 2. Calculate how many items to skip
    // Formula: (page - 1) * limit
    const skip = (page - 1) * limit;

    // 3. Fetch only the chunk needed + get total count for frontend checks
    const [allProjects, totalProjects] = await Promise.all([
      projects.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }), // optional: sort by newest
      projects.countDocuments({}),
    ]);

    // 4. Return the data along with pagination meta-data
    return new Response(
      JSON.stringify({
        projects: allProjects,
        hasMore: skip + allProjects.length < totalProjects,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
