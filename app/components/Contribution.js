export default function Contribution({ item }) {
  if (!item) return null;

  return (
    <article className="border border-gray-200 p-4 rounded-lg mb-4">
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900">
        {item.title}
      </h3>

      {/* META */}
      <div className="text-sm text-gray-500 mb-2">
        {item.type} •{" "}
        {new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* DESCRIPTION */}
      {item.description && (
        <p className="text-gray-700 mb-2">
          {item.description}
        </p>
      )}

      {/* NOTES */}
      {item.notes?.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 mb-2">
          {item.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}

      {/* LINKS WITH LOGOS */}
      <div className="flex gap-4 mt-3 items-center">
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
          >
            <GitHubIcon />
            <span className="text-sm">GitHub</span>
          </a>
        )}

        {item.websiteUrl && (
          <a
            href={item.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
          >
            <LinkIcon />
            <span className="text-sm">Website</span>
          </a>
        )}
      </div>
    </article>
  );
}

/* ================= ICONS ================= */

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.64.41.36.77 1.07.77 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.9 12a5 5 0 015-5h3v2h-3a3 3 0 000 6h3v2h-3a5 5 0 01-5-5zm6.1 1h4v-2h-4v2zm5-6h-3V5h3a5 5 0 010 10h-3v-2h3a3 3 0 000-6z" />
    </svg>
  );
}
