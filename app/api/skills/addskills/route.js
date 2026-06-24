import connectMongo from "@/lib/db.js";
import skills from "@/models/skills.model";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const { category } = Object.fromEntries(formData);
    const parseArrayInput = (fieldData) => {
      if (!fieldData) return [];
      try {
        // Try parsing as JSON first
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [fieldData];
      } catch {
        // Fallback: Split by comma and clean up whitespace
        return fieldData
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    };
    const skills = parseArrayInput(formData.get("skills"));
    const newSkill = new skills({ category, skills });
    await newSkill.save();
    return new Response(
      JSON.stringify({ message: "Skill added successfully" }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Skills add karte waqt error aaya" }),
      { status: 500 },
    );
  }
}
