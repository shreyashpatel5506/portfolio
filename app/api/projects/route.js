import connectMongo from "@/lib/db.js";
import projects from "@/models/projects.model";

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 3;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    // Build the query object based on filters
    const query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (search) {
      // Basic case-insensitive regex search on title or description
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 2. Calculate how many items to skip
    const skip = (page - 1) * limit;

    // 3. Fetch only the chunk needed + get total count for frontend checks
    const [allProjects, totalProjects] = await Promise.all([
      projects.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      projects.countDocuments(query),
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
