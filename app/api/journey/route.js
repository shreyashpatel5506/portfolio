import connectMongo from "@/lib/db";
import Journey from "@/models/journey.model";

export async function GET() {
  try {
    await connectMongo();
    const journeys = await Journey.find({}).sort({ date: -1 }).lean();
    return Response.json({ journeys });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { title, description, date, type, icon } = body;

    if (!title || !description || !date) {
      return Response.json({ error: "title, description, and date are required" }, { status: 400 });
    }

    const newJourney = new Journey({
      title,
      description,
      date: new Date(date),
      type,
      icon,
    });

    await newJourney.save();
    return Response.json({ message: "Journey added successfully", journey: newJourney }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
