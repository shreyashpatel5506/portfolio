import mongoose from "mongoose";
const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const experience = mongoose.model("experience", experienceSchema);
export default experience;
