import connectMongo from "@/lib/db.js";
import projects from "@/models/projects.model";
import { uploadImage, uploadVideo } from "@/lib/cloudinary.js"; // Adjust this path to your utility file
import fs from "fs";
import path from "path";

export async function POST(req) {
  // Temporary file tracks for cleanup
  let tempImagePath = null;
  let tempVideoPath = null;

  try {
    await connectMongo();
    const formData = await req.formData();

    // 1. Extract standard text strings
    const title = formData.get("title");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const liveurl = formData.get("liveurl");
    const category = formData.get("category") || "Full Stack";
    const projectSection = formData.get("projectSection") || "";
    const featured = formData.get("featured") === "true";
    
    // Case study text fields
    const problemStatement = formData.get("problemStatement") || "";
    const solution = formData.get("solution") || "";
    const architecture = formData.get("architecture") || "";

    const parseArrayInput = (fieldData) => {
      if (!fieldData) return [];
      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [fieldData];
      } catch {
        return fieldData.split(",").map((item) => item.trim()).filter(Boolean);
      }
    };

    const technologies = parseArrayInput(formData.get("technologies"));
    const features = parseArrayInput(formData.get("features"));
    const challenges = parseArrayInput(formData.get("challenges"));
    const learnings = parseArrayInput(formData.get("learnings"));
    const futureImprovements = parseArrayInput(formData.get("futureImprovements"));

    const imageFile = formData.get("image");
    const videoFile = formData.get("video");

    if (!imageFile) {
      return new Response(JSON.stringify({ error: "Image file is required" }), {
        status: 400,
      });
    }

    // 4. Convert Next.js File objects to local temporary files for Cloudinary
    const saveToTemp = async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const tempPath = path.join(
        process.cwd(),
        "tmp",
        `${Date.now()}-${file.name}`,
      );

      // Ensure local tmp directory exists
      if (!fs.existsSync(path.join(process.cwd(), "tmp"))) {
        fs.mkdirSync(path.join(process.cwd(), "tmp"));
      }

      fs.writeFileSync(tempPath, buffer);
      return tempPath;
    };

    tempImagePath = await saveToTemp(imageFile);

    const cloudinaryImage = await uploadImage(tempImagePath);

    let cloudinaryVideo = null;

    if (videoFile && videoFile.size > 0) {
      tempVideoPath = await saveToTemp(videoFile);
      cloudinaryVideo = await uploadVideo(tempVideoPath);
    }

    // 6. Save directly to MongoDB with Cloudinary secure URLs
    const newProject = new projects({
      title,
      description,
      category,
      projectSection,
      featured,
      technologies,
      githubLink,
      liveurl,
      image: cloudinaryImage.secure_url,
      video: cloudinaryVideo ? cloudinaryVideo.secure_url : null,
      features,
      problemStatement,
      solution,
      architecture,
      challenges,
      learnings,
      futureImprovements
    });

    await newProject.save();

    // 7. Clean up local temporary files
    if (fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    if (fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);

    return new Response(
      JSON.stringify({
        message: "Project added successfully",
        project: newProject,
      }),
      { status: 201 },
    );
  } catch (error) {
    // Fallback file cleanup on absolute failure
    if (tempImagePath && fs.existsSync(tempImagePath))
      fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath))
      fs.unlinkSync(tempVideoPath);

    console.error("API Route Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to add project" }),
      {
        status: 500,
      },
    );
  }
}
