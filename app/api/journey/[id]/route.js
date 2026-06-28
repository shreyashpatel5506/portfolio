import connectMongo from "@/lib/db";
import Journey from "@/models/journey.model";

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const deleted = await Journey.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Journey not found" }, { status: 404 });
    }
    return Response.json({ message: "Journey deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
