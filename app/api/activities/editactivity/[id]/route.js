import connectMongo from "@/lib/db.js";
import activities from "@/models/activity.model";
import { uploadImage, uploadVideo } from "@/lib/cloudinary.js";
import fs from "fs";
import path from "path";

export async function PUT(req, { params }) {
  let tempImagePath = null;
  let tempVideoPath = null;

  try {
    await connectMongo();
    const { id } = params;
    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description") || "";
    const link = formData.get("link") || "";
    const embedCode = formData.get("embedCode") || "";

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

    let updateData = {
      title,
      category,
      description,
      link,
      embedCode,
      skills,
    };

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

    if (imageFile && imageFile.size > 0) {
      tempImagePath = await saveToTemp(imageFile);
      const cloudinaryImage = await uploadImage(tempImagePath);
      updateData.image = cloudinaryImage.secure_url;
    }

    if (videoFile && videoFile.size > 0) {
      tempVideoPath = await saveToTemp(videoFile);
      const cloudinaryVideo = await uploadVideo(tempVideoPath);
      updateData.video = cloudinaryVideo.secure_url;
    }

    const updatedActivity = await activities.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedActivity) {
      return new Response(JSON.stringify({ error: "Activity not found" }), { status: 404 });
    }

    if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);

    return new Response(
      JSON.stringify({
        message: "Activity updated successfully",
        activity: updatedActivity,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    if (tempVideoPath && fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);

    console.error("Update Activity Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to update activity" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = params;

    const deletedActivity = await activities.findByIdAndDelete(id);

    if (!deletedActivity) {
      return new Response(JSON.stringify({ error: "Activity not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Activity deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Activity Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to delete activity" }),
      { status: 500 }
    );
  }
}
