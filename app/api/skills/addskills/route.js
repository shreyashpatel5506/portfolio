import connectMongo from "@/lib/db";
import Skills from "@/models/skills.model";

export async function POST(req) {
  try {
    await connectMongo();

    const formData = await req.formData();

    const category = formData.get("category");

    const parseSkills = (data) => {
      if (!data) return [];

      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    };

    const newSkills = parseSkills(formData.get("skills"));

    const existingCategory = await Skills.findOne({ category });

    if (existingCategory) {
      existingCategory.skills = [
        ...existingCategory.skills,
        ...newSkills.filter(
          (newSkill) =>
            !existingCategory.skills.some(
              (skill) => skill.name === newSkill.name,
            ),
        ),
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
