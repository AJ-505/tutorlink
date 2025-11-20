"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center gap-4 px-4">
      <AlertCircle className="h-16 w-16 text-red-500" />
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Error
        </h2>
        <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
          Something went wrong while loading the dashboard. This has been logged
          and we&#39;ll look into it.
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Refresh Dashboard
        </Button>
      </div>
    </div>
  );
}
