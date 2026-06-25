import connectMongo from "@/lib/db";
import certificate from "@/models/certificates.model";
import { uploadImage } from "@/lib/uploadImage";

export async function POST(req) {
  let tempImagePath = null;
  try {
    await connectMongo();
    const body = await req.json();
    const {
      title,
      issuer,
      issueDate,
      expirationDate,
      credentialId,
      credentialUrl,
    } = req.formData();

    const imageFile = formData.get("image");
    if (!imageFile) {
      return new Response(
        JSON.stringify({ error: "Image and Video files are required" }),
        { status: 400 },
      );
    }
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
    const newCertificate = new certificate({
      title,
      issuer,
      issueDate,
      expirationDate,
      credentialId,
      credentialUrl,
      image: cloudinaryImage.secure_url,
    });
    await newCertificate.save();
    return new Response(
      JSON.stringify({
        message: "Certificate added successfully",
        certificate: newCertificate,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add certificate" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
