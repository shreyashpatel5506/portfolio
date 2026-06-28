import connectMongo from "@/lib/db";
import Certificate from "@/models/certificates.model";
import { uploadImage } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

// GET all certificates
export async function GET() {
  try {
    await connectMongo();
    const certificates = await Certificate.find({}).sort({ issueDate: -1 }).lean();
    return Response.json({ certificates });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST create certificate (multipart/form-data)
export async function POST(req) {
  let tempImagePath = null;
  try {
    await connectMongo();
    const formData = await req.formData();

    const title = formData.get("title");
    const issuer = formData.get("issuer");
    const issueDate = formData.get("issueDate");
    const expirationDate = formData.get("expirationDate");
    const credentialId = formData.get("credentialId");
    const credentialUrl = formData.get("credentialUrl");
    const imageFile = formData.get("image");

    if (!title || !issuer || !issueDate) {
      return Response.json(
        { error: "title, issuer, and issueDate are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const tmpDir = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
      tempImagePath = path.join(tmpDir, `${Date.now()}-${imageFile.name}`);
      fs.writeFileSync(tempImagePath, buffer);
      const uploaded = await uploadImage(tempImagePath);
      imageUrl = uploaded.secure_url;
    }

    const newCertificate = new Certificate({
      title,
      issuer,
      issueDate: new Date(issueDate),
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
      credentialId: credentialId || undefined,
      credentialUrl: credentialUrl || undefined,
      image: imageUrl,
    });

    await newCertificate.save();

    return Response.json(
      { message: "Certificate added successfully", certificate: newCertificate },
      { status: 201 }
    );
  } catch (error) {
    if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath);
    return Response.json({ error: error.message || "Failed to add certificate" }, { status: 500 });
  }
}
