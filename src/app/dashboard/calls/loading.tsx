import { Skeleton } from "@/components/ui/skeleton";

export default function CallsLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-4">
      {/* Title */}
      <Skeleton className="h-7 w-32" />

      {/* Peer ID */}
      <Skeleton className="h-5 w-64" />

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-64 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Audio/Video Toggle Buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Video Grids */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="aspect-video w-full rounded-md" />
        <Skeleton className="aspect-video w-full rounded-md" />
      </div>
    </div>
  );
}
