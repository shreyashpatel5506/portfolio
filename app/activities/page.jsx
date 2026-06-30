"use client";
import React, { useState, useEffect } from "react";
import GridSection from "@/components/ui/GridSection";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities/getactivity");
        if (res.ok) {
          const data = await res.json();
          const fetchedActivities = data.activities || [];
          setActivities(fetchedActivities);

          // Extract unique categories
          const uniqueCategories = [...new Set(fetchedActivities.map(a => a.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = activeCategory === "All"
    ? activities
    : activities.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <GridSection>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Extra Activities & Ideas
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Explore my latest posts, open-source contributions, hackathon projects, and tech talks.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-20">Loading activities...</div>
          ) : (
            <>
              {/* Filter Bar */}
              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === "All"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Grid of Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity._id}
                    onClick={() => setSelectedActivity(activity)}
                    className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden bg-slate-900">
                      {activity.image ? (
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : activity.video ? (
                        <video
                          src={activity.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      ) : activity.embedCode ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                          <span className="text-sm">[Embedded Content]</span>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                          No Media
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/80 text-white backdrop-blur-md">
                          {activity.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                        {activity.description || "Click to view details"}
                      </p>

                      {activity.skills && activity.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {activity.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs font-medium text-slate-300 bg-slate-800 px-2 py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {activity.skills.length > 3 && (
                            <span className="text-xs font-medium text-slate-500 px-1 py-1">
                              +{activity.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredActivities.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                  No activities found for this category.
                </div>
              )}
            </>
          )}
        </div>
      </GridSection>

      {/* Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            
            <div className="p-6 sm:p-8 flex-1">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">
                  {selectedActivity.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {selectedActivity.title}
                </h2>
              </div>

              {/* Media Section */}
              <div className="mb-8 rounded-xl overflow-hidden bg-black/50">
                {selectedActivity.embedCode ? (
                  <div
                    className="w-full overflow-hidden flex justify-center py-4"
                    dangerouslySetInnerHTML={{ __html: selectedActivity.embedCode }}
                  />
                ) : selectedActivity.video ? (
                  <video
                    src={selectedActivity.video}
                    controls
                    autoPlay
                    className="w-full max-h-[500px] object-contain"
                  />
                ) : selectedActivity.image ? (
                  <img
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    className="w-full max-h-[500px] object-contain"
                  />
                ) : null}
              </div>

              {/* Content Section */}
              <div className="prose prose-invert max-w-none mb-8">
                {selectedActivity.description && (
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedActivity.description}
                  </div>
                )}
              </div>

              {/* Meta Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {selectedActivity.skills && selectedActivity.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1.5 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {selectedActivity.link && (
                  <a
                    href={selectedActivity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors whitespace-nowrap"
                  >
                    View Source
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
