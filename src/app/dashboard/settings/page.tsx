import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Suspense } from "react";
import { api } from "@/trpc/server";

async function UserRoleContent() {
  const userRole = await api.signal.getViewerRole();

  if (userRole !== "TUTOR") return null;

  return (
    <div className="border-t border-neutral-200 pt-4">
      <h2 className="mb-4 text-lg font-medium text-neutral-900">Signals</h2>
      <Link href="/dashboard/signal">
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
          <Zap size={18} />
          View Active Signals
        </button>
      </Link>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-neutral-900">Settings</h1>

      <Suspense fallback={<div className="h-20 animate-pulse rounded bg-gray-200" />}>
        <UserRoleContent />
      </Suspense>

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
