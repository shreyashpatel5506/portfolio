import mongoose from "mongoose";

const opensourceSchema = new mongoose.Schema(
  {
    repo: {
      type: String,
      required: true,
    },
    prTitle: {
      type: String,
      required: true,
    },
    prUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["merged", "open", "closed"],
      default: "merged",
    },
    description: {
      type: String,
      required: true,
    },
    contributionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const opensource = mongoose.models.opensource || mongoose.model("opensource", opensourceSchema);

export default opensource;
