import mongoose from "mongoose";
import { type } from "os";

const projectSchema = new mongoose.Schema(
    {
        PostImage: {
            type: String,
            trim: true,
        },
        ProjectName: {
            type: String,
            required: true,
            trim: true,
        },
        ProjectDescription: {
            type: String,
            required: true,
        },
        ProjectFeatures: {
            type: [String],
            default: []
        },
        GithubURL: {
            type: String,
            trim: true,
        },
        LinkedinPostURL: {
            type: String,
            trim: true,
        },
        LiveSiteURL: {
            type: String,
            trim: true,
        },
        Technologies: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Projects = mongoose.models.Project || mongoose.model("Projects", projectSchema);

export default Projects;
