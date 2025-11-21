import { Skeleton } from "@/components/ui/skeleton";

export default function TutorProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <Skeleton className="h-24 w-24 flex-shrink-0 rounded-full" />

          <div className="flex-1 space-y-3">
            {/* Name */}
            <Skeleton className="h-8 w-48" />
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32" />
            </div>
            {/* Quick stats */}
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Subjects Section */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-48" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
