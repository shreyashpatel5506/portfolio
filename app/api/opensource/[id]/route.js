import connectMongo from "@/lib/db";
import Opensource from "@/models/opensource.model";

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const deleted = await Opensource.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Contribution not found" }, { status: 404 });
    }
    return Response.json({ message: "Contribution deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
