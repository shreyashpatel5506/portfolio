import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    skills: {
      type: [skillItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Skills = mongoose.models.Skills || mongoose.model("Skills", skillSchema);

export default Skills;
