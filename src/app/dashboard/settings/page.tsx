import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/trpc/server";
import { Zap } from "lucide-react";

export default async function SettingsPage() {
  const userRole = await api.signal.getViewerRole();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-neutral-900">Settings</h1>

      {userRole === "TUTOR" && (
        <div className="border-t border-neutral-200 pt-4">
          <h2 className="mb-4 text-lg font-medium text-neutral-900">Signals</h2>
          <Link href="/dashboard/signal">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
              <Zap size={18} />
              View Active Signals
            </button>
          </Link>{" "}
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
