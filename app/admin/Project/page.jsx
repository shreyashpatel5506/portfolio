"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  // Projects list state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // File Upload States
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // Temporary input state for a single feature being typed
  const [featureInput, setFeatureInput] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveurl: "",
    technologies: "", // Kept as comma-separated string
    features: [], // CHANGED: Initialized as an array
    problemStatement: "",
    solution: "",
    architecture: "",
  });

  // Fetch all projects on mount
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || data);
      }
    } catch (error) {
      console.error("Failed fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form Input Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") setImageFile(files[0]);
    if (name === "video") setVideoFile(files[0]);
  };

  // Feature Array Handlers
  const handleAddFeature = (e) => {
    e.preventDefault();
    const trimmed = featureInput.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData({
        ...formData,
        features: [...formData.features, trimmed],
      });
      setFeatureInput(""); // Clear the input field
    }
  };

  const handleRemoveFeature = (indexToRemove) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, index) => index !== indexToRemove),
    });
  };

  // Open Modal for Creating a New Project
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProjectId(null);
    setImageFile(null);
    setVideoFile(null);
    setFeatureInput("");
    setFormData({
      title: "",
      description: "",
      githubLink: "",
      liveurl: "",
      technologies: "",
      features: [], // Reset to empty array
      problemStatement: "",
      solution: "",
      architecture: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal and Populate Fields for Editing
  const openEditModal = (project) => {
    setIsEditing(true);
    setCurrentProjectId(project._id || project.id);
    setImageFile(null);
    setVideoFile(null);
    setFeatureInput("");

    setFormData({
      title: project.title || "",
      description: project.description || "",
      githubLink: project.githubLink || "",
      liveurl: project.liveurl || "",
      problemStatement: project.problemStatement || "",
      solution: project.solution || "",
      architecture: project.architecture || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      // CHANGED: Keep it as an array directly
      features: Array.isArray(project.features) ? project.features : [],
    });
    setIsModalOpen(true);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("githubLink", formData.githubLink);
    data.append("liveurl", formData.liveurl);
    data.append("problemStatement", formData.problemStatement);
    data.append("solution", formData.solution);
    data.append("architecture", formData.architecture);

    // Parse technologies (comma-separated still)
    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    data.append("technologies", JSON.stringify(techArray));

    // CHANGED: Append directly from our state array (no commas to break your sentences!)
    data.append("features", JSON.stringify(formData.features));

    if (imageFile) data.append("image", imageFile);
    if (videoFile) data.append("video", videoFile);

    let url = "/api/projects/addproject";
    let method = "POST";

    if (isEditing) {
      url = `/api/projects/editproject/${currentProjectId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, { method, body: data });
      const result = await res.json();

      if (res.ok) {
        alert(
          isEditing
            ? "Project updated successfully!"
            : "Project added successfully!",
        );
        setIsModalOpen(false);
        fetchProjects();
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Request failed. Check console for details.");
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          alert("Project deleted successfully!");
          fetchProjects();
        } else {
          alert("Failed to delete project.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and update your live portfolio entries.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition duration-150"
          >
            + Add New Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 font-medium text-gray-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
            No projects found. Click "+ Add New Project" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id || project.id}
                onClick={() => openEditModal(project)}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-300 cursor-pointer transition duration-200 flex flex-col justify-between"
              >
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                    {project.description}
                  </p>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs font-medium text-blue-600">
                  <span>Click to Edit / View details</span>
                  <button
                    onClick={(e) => handleDelete(e, project._id || project.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Project Details" : "Create New Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveurl"
                    value={formData.liveurl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, Tailwind"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
              </div>

              {/* REFACTORED FEATURES SECTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature(e);
                      }
                    }}
                    placeholder="Type a sentence feature and press Enter or click Add..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition"
                  >
                    Add
                  </button>
                </div>

                {/* Visible list of currently added features */}
                {formData.features.length > 0 && (
                  <ul className="bg-gray-50 rounded-md p-3 border border-gray-200 divide-y divide-gray-200 max-h-40 overflow-y-auto">
                    {formData.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-start py-2 text-sm text-gray-700 gap-4"
                      >
                        <span className="break-words flex-1">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-red-500 hover:text-red-700 font-medium text-xs pt-0.5"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Meta Information
                </label>
                <input
                  type="text"
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  placeholder="Problem Statement"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
                <input
                  type="text"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  placeholder="Solution"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
                <input
                  type="text"
                  name="architecture"
                  value={formData.architecture}
                  onChange={handleChange}
                  placeholder="Architecture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Replace Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Replace Video
                  </label>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  {isEditing ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
