"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Plus } from "lucide-react";

export default function ActivityAdmin() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);

  // File Upload States
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    link: "",
    embedCode: "",
    skills: "",
  });

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/activities/getactivity");
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (error) {
      console.error("Failed fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") setImageFile(files[0]);
    if (name === "video") setVideoFile(files[0]);
  };

  const handleCategorySelectChange = (e) => {
    if (e.target.value === "NEW_CATEGORY") {
      setIsNewCategory(true);
      setFormData({ ...formData, category: "" });
    } else {
      setIsNewCategory(false);
      setFormData({ ...formData, category: e.target.value });
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentActivityId(null);
    setImageFile(null);
    setVideoFile(null);
    setIsNewCategory(false);
    setCustomCategory("");
    setFormData({
      title: "",
      category: "",
      description: "",
      link: "",
      embedCode: "",
      skills: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (activity) => {
    setIsEditing(true);
    setCurrentActivityId(activity._id);
    setImageFile(null);
    setVideoFile(null);
    setIsNewCategory(false);
    setCustomCategory("");
    setFormData({
      title: activity.title || "",
      category: activity.category || "",
      description: activity.description || "",
      link: activity.link || "",
      embedCode: activity.embedCode || "",
      skills: Array.isArray(activity.skills) ? activity.skills.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = isNewCategory ? customCategory : formData.category;
    
    if (!finalCategory) {
      alert("Please select or enter a category");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", finalCategory);
    data.append("description", formData.description);
    data.append("link", formData.link);
    data.append("embedCode", formData.embedCode);
    
    const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);
    data.append("skills", JSON.stringify(skillsArray));

    if (imageFile) data.append("image", imageFile);
    if (videoFile) data.append("video", videoFile);

    const url = isEditing
      ? `/api/activities/editactivity/${currentActivityId}`
      : "/api/activities/addactivity";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        alert(`Activity ${isEditing ? "updated" : "added"} successfully!`);
        setIsModalOpen(false);
        fetchActivities();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission.");
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this activity?")) {
      try {
        const res = await fetch(`/api/activities/editactivity/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Activity deleted");
          fetchActivities();
        } else {
          alert("Failed to delete activity");
        }
      } catch (error) {
        console.error("Deletion error:", error);
      }
    }
  };

  const moveActivity = async (index, direction) => {
    const newActivities = [...activities];
    if (direction === "up" && index > 0) {
      const temp = newActivities[index - 1];
      newActivities[index - 1] = newActivities[index];
      newActivities[index] = temp;
    } else if (direction === "down" && index < newActivities.length - 1) {
      const temp = newActivities[index + 1];
      newActivities[index + 1] = newActivities[index];
      newActivities[index] = temp;
    } else {
      return;
    }
    
    // update order numbers purely based on index
    const updatedOrderList = newActivities.map((act, i) => ({ id: act._id, order: i }));
    setActivities(newActivities);

    try {
      await fetch("/api/activities/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedOrderList })
      });
    } catch (err) {
      console.error("Reorder failed", err);
    }
  };

  const existingCategories = [...new Set(activities.map(a => a.category))];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#030712] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white-200 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Extra Activities
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage ideas, links, gists, and talks.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              + Add New Activity
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 font-medium text-gray-400">
            Loading activities...
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-gray-400">
            No activities found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <div
                key={activity._id}
                onClick={() => openEditModal(activity)}
                className="group bg-slate-900 rounded-xl border border-slate-700 shadow-sm overflow-hidden hover:border-blue-500 cursor-pointer transition duration-200 flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                      {activity.category}
                    </span>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => moveActivity(index, "up")} className="p-1 text-gray-400 hover:text-white" disabled={index === 0}>
                        <ArrowUp size={16} />
                      </button>
                      <button onClick={() => moveActivity(index, "down")} className="p-1 text-gray-400 hover:text-white" disabled={index === activities.length - 1}>
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mt-2">
                    {activity.description || activity.link || "No description provided."}
                  </p>
                </div>
                <div className="bg-slate-800 px-5 py-3 border-t border-slate-700 flex justify-between items-center text-xs font-medium text-blue-400">
                  <span>Edit</span>
                  <button
                    onClick={(e) => handleDelete(e, activity._id)}
                    className="text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded"
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#0b0f19] text-white border border-slate-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
              <h2 className="text-2xl font-bold">
                {isEditing ? "Edit Activity" : "Create New Activity"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title (Required)
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category (Required)
                </label>
                {!isNewCategory ? (
                  <select
                    value={formData.category}
                    onChange={handleCategorySelectChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white mb-2"
                  >
                    <option value="" disabled>Select a category</option>
                    {existingCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="NEW_CATEGORY">+ Add New Category...</option>
                  </select>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g., ProductHunt, Gist, LinkedIn Post"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required={isNewCategory}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white"
                    />
                    <button type="button" onClick={() => setIsNewCategory(false)} className="px-3 py-2 bg-slate-800 rounded-md text-sm">Cancel</button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Link URL
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Skills / Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, AWS"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Embed Code (Raw HTML/Iframe)
                </label>
                <textarea
                  name="embedCode"
                  rows={4}
                  value={formData.embedCode}
                  onChange={handleChange}
                  placeholder='<iframe src="..." />'
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-white font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-900 file:text-blue-200 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-900 file:text-blue-200 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-800 rounded-md hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  {isEditing ? "Save Changes" : "Create Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
