"use client";

import { SignalForm } from "./_components/signal-form";
import { Activity, Clock, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast, Toaster } from "sonner";

type SignalData = {
  id: string;
  studentId: string;
  subject: string;
  message: string;
  urgency: number;
  status: string;
  createdAt: Date | string;
};

const urgencyConfig = {
  1: {
    label: "Low",
    bg: "bg-blue-100",
    text: "text-blue-900",
    badge: "border-blue-300",
  },
  2: {
    label: "Moderate",
    bg: "bg-yellow-100",
    text: "text-yellow-900",
    badge: "border-yellow-300",
  },
  3: {
    label: "High",
    bg: "bg-orange-100",
    text: "text-orange-900",
    badge: "border-orange-300",
  },
  4: {
    label: "Very High",
    bg: "bg-red-100",
    text: "text-red-900",
    badge: "border-red-300",
  },
  5: {
    label: "Critical",
    bg: "bg-red-200",
    text: "text-red-950",
    badge: "border-red-400",
  },
};

function SignalCard({ signal }: { signal: SignalData }) {
  const router = useRouter();
  const acceptSignal = api.signal.acceptSignal.useMutation();
  const config = urgencyConfig[signal.urgency as keyof typeof urgencyConfig];
  const timeAgo = new Date(signal.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - timeAgo.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const displayTime = diffMins < 1 ? "just now" : `${diffMins}m ago`;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 font-semibold text-white">
            {signal.studentId.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-900">
              Student #{signal.studentId.slice(0, 8)}
            </p>
            <p className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock size={12} />
              {displayTime}
            </p>
          </div>
        </div>
        <div
          className={`rounded px-2 py-1 text-xs font-semibold ${config.badge} border-2 ${config.bg} ${config.text}`}
        >
          {config.label}
        </div>
      </div>

      <div className="mb-3">
        <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-900">
          {signal.subject}
        </span>
        <p className="line-clamp-2 text-sm text-neutral-700">
          {signal.message}
        </p>
      </div>

      <button
        className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={acceptSignal.isPending}
        onClick={() => {
          acceptSignal.mutate(
            { signalId: signal.id },
            {
              onSuccess: (res) => {
                const to =
                  res?.redirectTo ??
                  `/dashboard/messages/${res.conversationId}`;
                router.push(to);
              },
            },
          );
        }}
      >
        {acceptSignal.isPending ? "Accepting..." : "Accept Signal"}
      </button>
    </div>
  );
}

export default function SignalPage() {
  const [tabActive, setTabActive] = useState<"create" | "manage">("create");
  const utils = api.useUtils();
  const { data: role } = api.signal.getViewerRole.useQuery();
  const isTutor = role === "TUTOR";
  const { data: activeSignals = [], isLoading: isLoadingActive } =
    api.signal.getSignals.useQuery(undefined, { enabled: isTutor });
  const { data: mySignals = [], isLoading: isLoadingMy } =
    api.signal.getMySignals.useQuery(undefined, { enabled: !isTutor });
  const deleteSignal = api.signal.deleteSignal.useMutation({
    onSuccess: async () => {
      toast.success("Signal cancelled successfully");
      await utils.signal.getMySignals.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel signal");
    },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-lg bg-indigo-100 p-2">
            <Zap size={24} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Signal
          </h1>
        </div>
        <p className="text-sm text-neutral-600 sm:text-base">
          Get instant help from nearby tutors by broadcasting your signal
        </p>
      </div>

      {/* Tabs (students only) */}
      {!isTutor && (
        <div className="mb-8 flex gap-4 border-b border-neutral-200">
          <button
            onClick={() => setTabActive("create")}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 sm:text-base ${
              tabActive === "create"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Create Signal
          </button>
          <button
            onClick={() => setTabActive("manage")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 sm:text-base ${
              tabActive === "manage"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Activity size={18} />
            Manage Signals
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-700">
              {Array.isArray(mySignals) ? mySignals.length : 0}
            </span>
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="mb-12">
        {/* Tutor view: just Active Signals */}
        {isTutor ? (
          <div className="space-y-4">
            {isLoadingActive ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                <p className="text-neutral-600">Loading active signals...</p>
              </div>
            ) : Array.isArray(activeSignals) && activeSignals.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-neutral-600">
                  Showing {activeSignals.length} active signals from students
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {activeSignals.map((signal: SignalData) => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <Activity size={48} className="mx-auto mb-4 text-neutral-300" />
                <p className="text-lg text-neutral-600">
                  No active signals right now
                </p>
                <p className="text-sm text-neutral-500">Check back soon!</p>
              </div>
            )}
          </div>
        ) : tabActive === "create" ? (
          <div className="space-y-8">
            <div className="rounded-lg border border-indigo-100 bg-linear-to-r from-indigo-50 to-blue-50 p-6">
              <h2 className="mb-2 text-xl font-bold text-neutral-900">
                🚀 Need help fast?
              </h2>
              <p className="text-neutral-700">
                Send a signal and connect with available tutors in seconds. The
                more urgent your request, the faster you&apos;ll get matched.
              </p>
            </div>
            <SignalForm />
          </div>
        ) : (
          <div className="space-y-4">
            {isLoadingMy ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                <p className="text-neutral-600">Loading your signals...</p>
              </div>
            ) : Array.isArray(mySignals) && mySignals.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-neutral-600">
                  You have {mySignals.length} signals
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mySignals.map((signal: SignalData) => {
                    const config =
                      urgencyConfig[
                        signal.urgency as keyof typeof urgencyConfig
                      ];
                    const timeAgo = new Date(signal.createdAt);
                    const now = new Date();
                    const diffMs = now.getTime() - timeAgo.getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    const displayTime =
                      diffMins < 1 ? "just now" : `${diffMins}m ago`;
                    const cancellable = signal.status === "pending";
                    return (
                      <div
                        key={signal.id}
                        className="rounded-lg border border-neutral-200 bg-white p-4"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <div
                              className={`rounded px-2 py-1 text-xs font-semibold ${config.badge} border-2 ${config.bg} ${config.text}`}
                            >
                              {config.label}
                            </div>
                          </div>
                          <span
                            className={`rounded px-2 py-1 text-xs font-semibold ${signal.status === "pending" ? "bg-yellow-100 text-yellow-900" : signal.status === "accepted" ? "bg-green-100 text-green-900" : signal.status === "rejected" ? "bg-red-100 text-red-900" : "bg-neutral-100 text-neutral-700"}`}
                          >
                            {signal.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-900">
                            {signal.subject}
                          </span>
                          <p className="line-clamp-2 text-sm text-neutral-700">
                            {signal.message}
                          </p>
                          <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                            <Clock size={12} />
                            {displayTime}
                          </p>
                        </div>
                        <button
                          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${cancellable ? "bg-red-600 text-white hover:bg-red-700" : "cursor-not-allowed bg-neutral-200 text-neutral-500"}`}
                          disabled={!cancellable || deleteSignal.isPending}
                          onClick={() =>
                            deleteSignal.mutate({ signalId: signal.id })
                          }
                        >
                          <Trash2 size={16} />
                          {deleteSignal.isPending
                            ? "Cancelling..."
                            : "Cancel Signal"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <Activity size={48} className="mx-auto mb-4 text-neutral-300" />
                <p className="text-lg text-neutral-600">
                  You don&apos;t have any signals yet
                </p>
                <p className="text-sm text-neutral-500">
                  Create one to get help fast
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 gap-4 border-t border-neutral-200 py-8 sm:grid-cols-2">
        <div className="space-y-2 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-neutral-900">
            <span className="text-xl">⚡</span> Pro Tips
          </h3>
          <ul className="space-y-1 text-sm text-neutral-600">
            <li>• Be specific about your question</li>
            <li>• Set the correct urgency level</li>
            <li>• Respond quickly when tutors accept</li>
          </ul>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-neutral-900">
            <span className="text-xl">📊</span> Current Stats
          </h3>
          <ul className="space-y-1 text-sm text-neutral-600">
            <li>• Avg response time: 2-5 minutes</li>
            <li>• 150+ active tutors online</li>
            <li>• 98% satisfaction rate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
