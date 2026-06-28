import connectMongo from "@/lib/db";
import Opensource from "@/models/opensource.model";

export async function GET() {
  try {
    await connectMongo();
    const opensource = await Opensource.find({}).sort({ contributionDate: -1 }).lean();
    return Response.json({ opensource });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { repo, prTitle, prUrl, status, description, contributionDate } = body;

    if (!repo || !prTitle || !prUrl || !description || !contributionDate) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const newOpensource = new Opensource({
      repo,
      prTitle,
      prUrl,
      status,
      description,
      contributionDate: new Date(contributionDate),
    });

    await newOpensource.save();
    return Response.json({ message: "Contribution added successfully", opensource: newOpensource }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
