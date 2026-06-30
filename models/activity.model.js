import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    embedCode: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const activities = mongoose.models.activities || mongoose.model("activities", activitySchema);

export default activities;
