"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/trpc/react";
import { Zap } from "lucide-react";

export default function SettingsPage() {
  const { data, isLoading, isError, error } =
    api.signal.getViewerRole.useQuery();
  const isTutor = !!data && data === "TUTOR";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-neutral-900">Settings</h1>

      {/* Loading skeleton for Signals section */}
      {isLoading && (
        <div className="border-t border-neutral-200 pt-4">
          <h2 className="mb-4 text-lg font-medium text-neutral-900">Signals</h2>
          <div className="h-10 w-48 animate-pulse rounded-lg bg-neutral-200"></div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="border-t border-neutral-200 pt-4">
          <h2 className="mb-2 text-lg font-medium text-neutral-900">Signals</h2>
          <p className="text-sm text-red-600">
            {error?.message || "Failed to load user role"}
          </p>
        </div>
      )}

      {/* Tutor-specific section - only show when loaded successfully and is tutor */}
      {!isLoading && !isError && isTutor && (
        <div className="border-t border-neutral-200 pt-4">
          <h2 className="mb-4 text-lg font-medium text-neutral-900">Signals</h2>
          <Link href="/dashboard/signal">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
              <Zap size={18} />
              View Active Signals
            </button>
          </Link>
        </div>
      )}

      <div className="border-t border-neutral-200 pt-4">
        <h2 className="mb-4 text-lg font-medium text-neutral-900">Account</h2>
        <SignOutButton redirectUrl="/">
          <button className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
