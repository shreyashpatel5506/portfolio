import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  //     //shuold be behave like this Frontend → React, Next.js, Tailwind
  // Backend → Node.js, Express
  // Database → MongoDB
  {
    category: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const skills = mongoose.model("skills", skillSchema);
export default skills;
