export default function ProjectSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card animate-pulse">
      {/* Image */}
      <div className="h-52 w-full bg-muted" />

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Title */}
        <div className="h-6 w-2/3 rounded bg-muted" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-7 w-20 rounded-md bg-muted" />
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 w-full rounded bg-muted" />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="h-5 w-20 rounded bg-muted" />
          <div className="h-5 w-24 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
