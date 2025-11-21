import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <header className="flex flex-col gap-1">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-48" />
      </header>

      {/* Search Bar Skeleton */}
      <section>
        <div className="mb-6">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </section>

      {/* Recommended Tutors Section */}
      <section>
        <Skeleton className="mb-3 h-7 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Generate 6 tutor card skeletons */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              {/* Avatar */}
              <div className="mb-4 flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
