"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          We apologize for the inconvenience. Please try again.
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go home
        </Button>
      </div>
    </div>
  );
}
