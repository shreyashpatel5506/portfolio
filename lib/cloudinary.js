import connectMongo from "@/lib/db.js";
import projects from "@/models/projects.model";
// Apni utility file ko yahan import karein
import { uploadImage, uploadVideo } from "@/lib/cloudinaryUtils.js";
import fs from "fs";
import path from "path";

export async function POST(req) {
  let tempImagePath = null;
  let tempVideoPath = null;

  try {
    await connectMongo();
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const liveurl = formData.get("liveurl");

    const parseArray = (fieldData) => {
      if (!fieldData) return [];

      if (Array.isArray(fieldData)) return fieldData;

      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [String(parsed).trim()];
      } catch {
        return [String(fieldData).trim()];
      }
    };

    const technologies = parseArray(formData.get("technologies"));
    const features = parseArray(formData.get("features"));

    const imageFile = formData.get("image");
    const videoFile = formData.get("video");

    if (!imageFile || !videoFile) {
      return new Response(
        JSON.stringify({ error: "Image aur Video files zaroori hain" }),
        { status: 400 },
      );
    }
    const saveToTemp = async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const tempDir = path.join(process.cwd(), "tmp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const tempPath = path.join(tempDir, `${Date.now()}-${file.name}`);
      fs.writeFileSync(tempPath, buffer);
      return tempPath;
    };

    tempImagePath = await saveToTemp(imageFile);
    tempVideoPath = await saveToTemp(videoFile);
    const cloudinaryImage = await uploadImage(tempImagePath);
    const cloudinaryVideo = await uploadVideo(tempVideoPath);

    const newProject = new projects({
      title,
      description,
      technologies, // Mongoose Array
      githubLink,
      liveurl,
      image: cloudinaryImage.secure_url, // Cloudinary ka string URL
      video: cloudinaryVideo.secure_url, // Cloudinary ka string URL
      features, // Mongoose Array
    });

    await newProject.save();

    return new Response(
      JSON.stringify({
        message: "Project added successfully",
        project: newProject,
      }),
      { status: 201 },
    );
  } catch (error) {
    if (tempImagePath && fs.existsSync(tempImagePath))
      fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath))
      fs.unlinkSync(tempVideoPath);

    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to add project" }), {
      status: 500,
    });
  }
}
