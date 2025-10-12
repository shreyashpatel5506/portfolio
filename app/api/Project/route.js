import uploadOnCloudinary from '@/app/cloudinary';
import connectMongo from '@/app/db';
import Projects from '@/app/model/project';
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';
import os from "os";

export async function POST(req) {
    try {
        await connectMongo();
        // take input from user
        const formData = await req.formData();

        const imageFile = formData.get("file");
        const ProjectName = formData.get("ProjectName");
        const ProjectDescription = formData.get("ProjectDescription");
        const ProjectFeatures = formData.get("ProjectFeatures" || "[]")
        const GithubURL = formData.get("GithubURL")
        const LinkedinPostURL = formData.get("LinkedinPostURL");
        const LiveSiteURL = formData.get("LiveSiteURL");
        const Technologies = JSON.parse(formData.get("Technologies") || "[]");

        let PostImageURL = "";

        if (imageFile && typeof imageFile.arrayBuffer === 'function') {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const tempFilePath = path.join(os.tmpdir(), imageFile.name);
            await writeFile(tempFilePath, buffer);
            PostImageURL = await uploadOnCloudinary(tempFilePath);
        }
        const newProject = await Projects.create({
            ProjectName,
            ProjectDescription,
            ProjectFeatures,
            PostImage: PostImageURL,
            GithubURL,
            LinkedinPostURL,
            LiveSiteURL,
            Technologies,
        });

        return NextResponse.json({ success: true, project: newProject }, { status: 201 });
    } catch (error) {
        console.error("❌ Error creating project:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongo();
        const projects = await Projects.find().sort({ createdAt: -1 })
        return Response.json({ success: true, projects }, { status: 200 });
    } catch (error) {
        console.error("❌ Error Fetching project:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}