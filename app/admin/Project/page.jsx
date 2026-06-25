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

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveurl: "",
    technologies: "", // Expected as comma-separated string in UI
    features: "", // Expected as comma-separated string in UI
  });

  // Fetch all projects on mount
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects"); // Adjust this route to match your backend if needed
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || data); // Accounts for common nested responses
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

  // Open Modal for Creating a New Project
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProjectId(null);
    setImageFile(null);
    setVideoFile(null);
    setFormData({
      title: "",
      description: "",
      githubLink: "",
      liveurl: "",
      technologies: "",
      features: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal and Populate Fields for Editing
  const openEditModal = (project) => {
    setIsEditing(true);
    setCurrentProjectId(project._id || project.id); // fallback depending on database ID key
    setImageFile(null);
    setVideoFile(null);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      githubLink: project.githubLink || "",
      liveurl: project.liveurl || "",
      // Convert arrays back to comma-separated strings for easy input editing
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      features: Array.isArray(project.features)
        ? project.features.join(", ")
        : "",
    });
    setIsModalOpen(true);
  };

  // Submit Handler (Switches between POST and PUT dynamically)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("githubLink", formData.githubLink);
    data.append("liveurl", formData.liveurl);

    // Parse comma-separated strings back into arrays
    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    data.append("technologies", JSON.stringify(techArray));
    data.append("features", JSON.stringify(featuresArray));

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
        fetchProjects(); // Refresh dashboard list instantly
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Request failed. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Dashboard Layout */}
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

        {/* Projects Grid Display */}
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
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unified Action Modal (Add/Edit Form) */}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Features (Comma separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Auth, Stripe Dashboard"
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
