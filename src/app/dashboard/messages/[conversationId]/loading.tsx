import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-4">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 space-y-4 bg-gray-50 p-4">
        {/* Message skeletons - alternating sides for realistic chat feel */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
          >
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div
              className={`flex flex-col gap-2 ${i % 2 === 0 ? "" : "items-end"}`}
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton
                className={`h-16 ${i % 3 === 0 ? "w-64" : i % 3 === 1 ? "w-48" : "w-56"} rounded-lg`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
