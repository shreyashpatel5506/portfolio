import connectMongo from "@/lib/db";
import Certificate from "@/models/certificates.model";

// GET single certificate
export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const certificate = await Certificate.findById(id).lean();
    if (!certificate) {
      return Response.json({ error: "Certificate not found" }, { status: 404 });
    }
    return Response.json({ certificate });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE certificate
export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Certificate not found" }, { status: 404 });
    }
    return Response.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
