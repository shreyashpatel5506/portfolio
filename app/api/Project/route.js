import uploadOnCloudinary from '@/app/cloudinary';
import connectMongo from '@/app/db';
import Project from '@/app/model/project';
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectMongo();
        // take input from user
        const formData = await req.formData();

        const FilePath = formData.get("filePath");
        const ProjectName = formData.get("ProjectName");
        const GithubURL = formData.get("GithubURL")
        const LinkedinPostURL = formData.get("LinkedinPostURL");
        const LiveSiteURL = formData.get("LiveSiteURL");
        const Technologies = JSON.parse(formData.get("Technologies") || "[]");

        let PostImage = "";
        if (FilePath) {
            PostImage = uploadOnCloudinary(FilePath);
        }
        const newProject = await Project.create({
            ProjectName,
            PostImage,
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
        const projects = await Project.find().sort({ createdAt: -1 })
        return Response.json({ success: true, projects }, { status: 200 });
    } catch (error) {
        console.error("❌ Error Fetching project:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}