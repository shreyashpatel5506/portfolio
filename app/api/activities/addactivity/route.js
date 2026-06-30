import connectMongo from "@/lib/db.js";
import activities from "@/models/activity.model";
import { uploadImage, uploadVideo } from "@/lib/cloudinary.js";
import fs from "fs";
import path from "path";

export async function POST(req) {
  let tempImagePath = null;
  let tempVideoPath = null;

  try {
    await connectMongo();
    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description") || "";
    const link = formData.get("link") || "";
    const embedCode = formData.get("embedCode") || "";

    if (!title || !category) {
      return new Response(JSON.stringify({ error: "Title and Category are required" }), { status: 400 });
    }

    const parseArrayInput = (fieldData) => {
      if (!fieldData) return [];
      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [fieldData];
      } catch {
        return fieldData.split(",").map((item) => item.trim()).filter(Boolean);
      }
    };

    const skills = parseArrayInput(formData.get("skills"));

    const imageFile = formData.get("image");
    const videoFile = formData.get("video");

    const saveToTemp = async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const tempPath = path.join(process.cwd(), "tmp", `${Date.now()}-${file.name}`);
      if (!fs.existsSync(path.join(process.cwd(), "tmp"))) {
        fs.mkdirSync(path.join(process.cwd(), "tmp"));
      }
      fs.writeFileSync(tempPath, buffer);
      return tempPath;
    };

    let cloudinaryImage = null;
    if (imageFile && imageFile.size > 0) {
      tempImagePath = await saveToTemp(imageFile);
      cloudinaryImage = await uploadImage(tempImagePath);
    }

    let cloudinaryVideo = null;
    if (videoFile && videoFile.size > 0) {
      tempVideoPath = await saveToTemp(videoFile);
      cloudinaryVideo = await uploadVideo(tempVideoPath);
    }

    const newActivity = new activities({
      title,
      category,
      description,
      link,
      embedCode,
      skills,
      image: cloudinaryImage ? cloudinaryImage.secure_url : "",
      video: cloudinaryVideo ? cloudinaryVideo.secure_url : "",
    });

    await newActivity.save();

    if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);

    return new Response(
      JSON.stringify({
        message: "Activity added successfully",
        activity: newActivity,
      }),
      { status: 201 },
    );
  } catch (error) {
    if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);

    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to add activity" }), { status: 500 });
  }
}
