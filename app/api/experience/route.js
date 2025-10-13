import uploadOnCloudinary from '@/app/cloudinary';
import connectMongo from '@/app/db';
import Experience from '@/app/model/experience';
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';
import os from "os";

export async function POST(req) {
    try {
        await connectMongo();

        const formData = await req.formData();

        const imageFile = formData.get("file");
        const title = formData.get("title");
        const issuer = formData.get("issuer");
        const issueDate = formData.get("issueDate");
        const expirationDate = formData.get("expirationDate") || null; // Handle optional field
        const description = formData.get("description");
        const credentialURL = formData.get("credentialURL");
        const skills = JSON.parse(formData.get("skills") || "[]");
        const category = formData.get("category");

        let imageUrl = "";

        if (imageFile && typeof imageFile.arrayBuffer === 'function') {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            // Ensure a unique filename to prevent overwriting
            const tempFilePath = path.join(os.tmpdir(), `${Date.now()}_${imageFile.name}`);
            await writeFile(tempFilePath, buffer);
            imageUrl = await uploadOnCloudinary(tempFilePath);
        }

        const newExperience = await Experience.create({
            title,
            issuer,
            issueDate,
            expirationDate,
            description,
            credentialURL,
            skills,
            category,
            image: imageUrl,
        });

        return NextResponse.json({ success: true, experience: newExperience }, { status: 201 });
    } catch (error) {
        console.error("❌ Error creating experience:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongo();
        const experiences = await Experience.find().sort({ issueDate: -1 }); // Sort by newest first
        return NextResponse.json({ success: true, experiences }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching experiences:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}