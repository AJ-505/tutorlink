import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Skeleton className="h-7 w-32" />

      {/* Signals Section */}
      <div className="border-t border-neutral-200 pt-4">
        <Skeleton className="mb-4 h-6 w-24" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      {/* Account Section */}
      <div className="border-t border-neutral-200 pt-4">
        <Skeleton className="mb-4 h-6 w-24" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Additional Settings Sections */}
      <div className="border-t border-neutral-200 pt-4">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
