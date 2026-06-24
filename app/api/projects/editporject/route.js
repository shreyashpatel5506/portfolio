import connectMongo from "@/lib/db.js";
import projects from "@/models/projects.model";
import { uploadImage, uploadVideo } from "@/lib/cloudinaryUtils.js";
import fs from "fs";
import path from "path";

export async function PUT(req) {
  // Temporary file tracks for cleanup
  let tempImagePath = null;
  let tempVideoPath = null;

  try {
    await connectMongo();
    const formData = await req.formData();

    // 1. Project ID aur baaki text fields extract karna
    const id = formData.get("id"); // Frontend se project id bhejna zaroori hai
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Project ID is required for updating" }),
        { status: 400 },
      );
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const liveurl = formData.get("liveurl");

    // 2. Updated Parse Array Logic (Capsule system ke liye optimized)
    const parseArrayInput = (fieldData) => {
      if (!fieldData) return [];
      if (Array.isArray(fieldData)) return fieldData;
      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [String(parsed).trim()];
      } catch {
        return [String(fieldData).trim()];
      }
    };

    const technologies = parseArrayInput(formData.get("technologies"));
    const features = parseArrayInput(formData.get("features"));

    // Existing project ko check karein taaki purane media URLs mil sakein
    const existingProject = await projects.findById(id);
    if (!existingProject) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    // 3. Update karne ke liye naya data object taiyar karein
    const updateData = {
      title,
      description,
      technologies,
      githubLink,
      liveurl,
      features,
    };

    // Helper: File object ko local temporary file mein convert karne ke liye
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

    // 4. IMAGE UPLOAD HANDLING (Optional for Update)
    const imageFile = formData.get("image");
    // Check karein agar user ne sach mein naye file select ki hai (String check files ko filter karta hai)
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      tempImagePath = await saveToTemp(imageFile);
      const cloudinaryImage = await uploadImage(tempImagePath);
      updateData.image = cloudinaryImage.secure_url; // Naya URL set karein
    } else {
      updateData.image = existingProject.image; // Purana URL barkarar rakhein
    }

    // 5. VIDEO UPLOAD HANDLING (Optional for Update)
    const videoFile = formData.get("video");
    if (videoFile && typeof videoFile !== "string" && videoFile.size > 0) {
      tempVideoPath = await saveToTemp(videoFile);
      const cloudinaryVideo = await uploadVideo(tempVideoPath);
      updateData.video = cloudinaryVideo.secure_url; // Naya URL set karein
    } else {
      updateData.video = existingProject.video; // Purana URL barkarar rakhein
    }

    // 6. Database mein project ko update karna
    const updatedProject = await projects.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }, // { new: true } se updated data return hota hai
    );

    // 7. Local temporary files cleanup (Safety Check)
    if (tempImagePath && fs.existsSync(tempImagePath))
      fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath))
      fs.unlinkSync(tempVideoPath);

    return new Response(
      JSON.stringify({
        message: "Project updated successfully",
        project: updatedProject,
      }),
      { status: 200 },
    );
  } catch (error) {
    // Failure par backup cleanup
    if (tempImagePath && fs.existsSync(tempImagePath))
      fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath))
      fs.unlinkSync(tempVideoPath);

    console.error("API PUT Route Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update project" }),
      { status: 500 },
    );
  }
}
