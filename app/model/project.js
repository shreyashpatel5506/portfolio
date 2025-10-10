import mongoose from "mongoose";

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

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
