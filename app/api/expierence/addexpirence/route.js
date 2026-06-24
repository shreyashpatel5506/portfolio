import connectMongo from "@/lib/mongodb";
import Expirence from "@/models/Expirence";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { company, position, startDate, endDate, description, skills } =
      req.formData();
    const newExpirence = new Expirence({
      company,
      position,
      startDate,
      endDate,
      description,
      skills,
    });
    await newExpirence.save();
    return new Response(
      JSON.stringify({ message: "Experience added successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add experience" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
