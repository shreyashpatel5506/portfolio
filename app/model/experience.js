import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true,
        },

        issuer: {
            type: String,
            required: true,
            trim: true,
        },

        issueDate: {
            type: Date,
            required: true,
        },

        expirationDate: {
            type: Date,
        },

        description: {
            type: String,
            required: true,
        },

        credentialURL: {
            type: String,
            trim: true,
        },

        skills: {
            type: [String],
            default: [],
        },

        image: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: ["Certificate", "Training", "Award", "Course"],
            default: "Certificate",
        },
    },
    {
        timestamps: true,
    }
);

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;