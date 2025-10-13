import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        // The title of the certificate, training, or experience
        title: {
            type: String,
            required: true,
            trim: true,
        },
        // The name of the organization that issued the certificate or hosted the event
        issuer: {
            type: String,
            required: true,
            trim: true,
        },
        // The date when the certificate was issued or the training was completed
        issueDate: {
            type: Date,
            required: true,
        },
        // An optional expiration date for the credential
        expirationDate: {
            type: Date,
        },
        // A brief summary of the experience, what you learned, or the skills you gained
        description: {
            type: String,
            required: true,
        },
        // A direct link to view or verify the credential
        credentialURL: {
            type: String,
            trim: true,
        },
        // An array of skills associated with this experience
        skills: {
            type: [String],
            default: [],
        },
        // An optional image of the certificate or event (e.g., a URL from Cloudinary)
        image: {
            type: String,
            trim: true,
        },
        // You can categorize your experiences, e.g., 'Certificate', 'Training', 'Award'
        category: {
            type: String,
            required: true,
            enum: ["Certificate", "Training", "Award", "Course"],
            default: "Certificate",
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;