import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        PostImage: {
            type: String,
            trim: true, // removes extra spaces
        },
        ProjectName: {
            type: String,
            required: true,
            trim: true,
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
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent recompilation errors in Next.js (hot reload)
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
