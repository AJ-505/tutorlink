import { Skeleton } from "@/components/ui/skeleton";

export default function SignalLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-9 w-48" />
        </div>
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-4 border-b border-neutral-200">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-40" />
      </div>

      {/* Info Banner */}
      <div className="mb-8 rounded-lg border border-indigo-100 bg-indigo-50 p-6">
        <Skeleton className="mb-2 h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
      </div>

      {/* Signal Cards Grid */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded" />
            </div>

            <div className="mb-3 space-y-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <Skeleton className="mt-3 h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 gap-4 border-t border-neutral-200 py-8 sm:grid-cols-2">
        <div className="space-y-3 p-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        <div className="space-y-3 p-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
