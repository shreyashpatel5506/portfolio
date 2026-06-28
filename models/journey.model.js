import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["milestone", "learning", "project", "work"],
      default: "milestone",
    },
    icon: {
      type: String,
      default: "star", // default icon name
    },
  },
  {
    timestamps: true,
  }
);

const journey = mongoose.models.journey || mongoose.model("journey", journeySchema);

export default journey;
