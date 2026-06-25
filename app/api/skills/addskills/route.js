import connectMongo from "@/lib/db";
import Skills from "@/models/skills.model";

export async function POST(req) {
  try {
    await connectMongo();

    const formData = await req.formData();

    const category = formData.get("category");

    const parseArrayInput = (fieldData) => {
      if (!fieldData) return [];

      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return fieldData
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    };

    const newSkills = parseArrayInput(formData.get("skills"));

    const existingCategory = await Skills.findOne({ category });

    if (existingCategory) {
      existingCategory.skills = [
        ...new Set([...existingCategory.skills, ...newSkills]),
      ];

      await existingCategory.save();

      return Response.json({
        message: "Skills updated successfully",
      });
    }

    await Skills.create({
      category,
      skills: newSkills,
    });

    return Response.json(
      {
        message: "Category created successfully",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
