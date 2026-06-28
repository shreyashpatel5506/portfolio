import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Full Stack",
      enum: ["Full Stack", "Frontend", "Backend", "Mobile", "Open Source", "Tool", "Other"],
    },
    projectSection: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    liveurl: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    features: {
      type: [String],
      required: true,
    },
    // Case study fields
    problemStatement: {
      type: String,
      default: "",
    },
    solution: {
      type: String,
      default: "",
    },
    architecture: {
      type: String,
      default: "",
    },
    databaseDesign: {
      type: String,
      default: "",
    },
    apiFlow: {
      type: String,
      default: "",
    },
    challenges: {
      type: [String],
      default: [],
    },
    learnings: {
      type: [String],
      default: [],
    },
    futureImprovements: {
      type: [String],
      default: [],
    },
    screenshots: {
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

// Auto-generate slug from title before saving
projectSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

const projects =
  mongoose.models.projects || mongoose.model("projects", projectSchema);

export default projects;
