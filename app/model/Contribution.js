import mongoose from "mongoose";

const ContributionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "Open Source",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },
    websiteUrl: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Prevent model overwrite error in Next.js
const Contribution =
  mongoose.models.Contribution ||
  mongoose.model("Contribution", ContributionSchema);

export default Contribution;
