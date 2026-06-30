import connectMongo from "@/lib/db.js";
import activities from "@/models/activity.model";

export async function PUT(req) {
  try {
    await connectMongo();
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
    }

    // items should be an array of objects: { id: "some_id", order: 0 }
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    if (bulkOps.length > 0) {
      await activities.bulkWrite(bulkOps);
    }

    return new Response(
      JSON.stringify({ message: "Activities reordered successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Reorder Activities Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to reorder activities" }),
      { status: 500 }
    );
  }
}
