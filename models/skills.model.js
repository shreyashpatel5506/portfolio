import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Skills = mongoose.models.Skills || mongoose.model("Skills", skillSchema);

export default Skills;
