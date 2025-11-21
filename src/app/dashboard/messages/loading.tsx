import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div>
      {/* Header */}
      <Skeleton className="mb-4 h-7 w-32" />

      {/* Conversation List */}
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4"
          >
            {/* User names */}
            <Skeleton className="mb-2 h-5 w-48" />
            {/* Last message */}
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
