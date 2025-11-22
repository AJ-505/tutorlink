"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Clock, Trash2, Zap } from "lucide-react";
import { SignalForm } from "./_components/signal-form";
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
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    badge: "border-blue-400/50",
  },
  2: {
    label: "Moderate",
    bg: "bg-yellow-900/20",
    text: "text-yellow-300",
    badge: "border-yellow-400/50",
  },
  3: {
    label: "High",
    bg: "bg-orange-900/20",
    text: "text-orange-300",
    badge: "border-orange-400/50",
  },
  4: {
    label: "Very High",
    bg: "bg-red-900/20",
    text: "text-red-300",
    badge: "border-red-400/50",
  },
  5: {
    label: "Critical",
    bg: "bg-red-600/30",
    text: "text-red-200 font-bold",
    badge: "border-red-500",
  },
};

function SignalCard({ signal }: { signal: SignalData }) {
  const router = useRouter();
  const acceptSignal = api.signal.acceptSignal.useMutation();
  const config = urgencyConfig[signal.urgency as keyof typeof urgencyConfig];
  const timeAgo = new Date(signal.createdAt as string);
  const now = new Date();
  const diffMs = now.getTime() - timeAgo.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const displayTime = diffMins < 1 ? "Just now" : `${diffMins}m ago`;

  return (
    <div className="group rounded-2xl border border-white/10 bg-[#141517]/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(94,106,210,0.3)]">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] shadow-lg">
            <span className="text-sm font-semibold text-white">
              {signal.studentId.slice(0, 1).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-[#EDEDEF]">
              Student #{signal.studentId.slice(0, 8)}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#8A8F98]">
              <Clock size={14} />
              {displayTime}
            </p>
          </div>
        </div>
        <div
          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-semibold ${config.badge} ${config.bg} ${config.text}`}
        >
          {config.label}
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <span className="inline-block rounded-full border border-indigo-500/40 bg-indigo-500/20 px-4 py-1.5 text-sm font-semibold text-indigo-300">
          {signal.subject}
        </span>
        <p className="line-clamp-3 text-base leading-relaxed text-[#EDEDEF]">
          {signal.message}
        </p>
      </div>

      <button
        className="w-full rounded-xl bg-gradient-to-r from-[#5E6AD2] to-[#7C8CF6] px-6 py-3.5 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:from-[#4F5AC8] hover:to-[#6E7AD9] hover:shadow-[0_0_30px_-10px_#5E6AD2] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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
        {acceptSignal.isPending ? (
          <>
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
            <span>Accepting...</span>
          </>
        ) : (
          "Accept Signal"
        )}
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

  const statusConfig = {
    pending: "bg-yellow-500/20 border border-yellow-500/30 text-yellow-300",
    accepted: "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300",
    rejected: "bg-red-500/20 border border-red-500/30 text-red-300",
  } as const;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] shadow-[0_0_30px_-12px_#5E6AD2/0.4]">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Signal
            </h1>
            <p className="mt-1 text-lg leading-relaxed text-[#8A8F98]">
              Get instant help from nearby tutors by broadcasting your signal
            </p>
          </div>
        </div>
      </div>

      {/* Student Tabs */}
      {!isTutor && (
        <div className="flex max-w-2xl items-center gap-8 border-b border-white/10 pb-6">
          <button
            onClick={() => setTabActive("create")}
            className={`px-6 pb-4 text-lg font-semibold transition-colors ${
              tabActive === "create"
                ? "border-b-2 border-[#5E6AD2] text-white"
                : "text-[#8A8F98] hover:text-white"
            }`}
          >
            Create Signal
          </button>
          <button
            onClick={() => setTabActive("manage")}
            className={`flex items-center gap-2 px-6 pb-4 text-lg font-semibold transition-colors ${
              tabActive === "manage"
                ? "border-b-2 border-[#5E6AD2] text-white"
                : "text-[#8A8F98] hover:text-white"
            }`}
          >
            <Activity size={20} />
            Manage Signals
            <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white">
              {Array.isArray(mySignals) ? mySignals.length : 0}
            </span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl">
        {isTutor ? (
          <div className="space-y-8">
            {isLoadingActive ? (
              <div className="py-20 text-center">
                <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-2xl border-4 border-white/20 border-t-[#5E6AD2]"></div>
                <p className="text-xl text-[#8A8F98]">
                  Loading active signals...
                </p>
              </div>
            ) : activeSignals.length > 0 ? (
              <>
                <p className="mb-8 text-lg text-[#8A8F98]">
                  Showing {activeSignals.length} active signals from students
                  nearby
                </p>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {activeSignals.map((signal: SignalData) => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-24 text-center">
                <Activity className="mx-auto mb-8 h-20 w-20 text-white/30" />
                <p className="mb-2 text-3xl font-semibold text-[#EDEDEF]">
                  No active signals right now
                </p>
                <p className="text-xl text-[#8A8F98]">
                  Check back soon for new requests!
                </p>
              </div>
            )}
          </div>
        ) : tabActive === "create" ? (
          <div className="space-y-12">
            {/* Info Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#5E6AD2]/20 bg-gradient-to-r from-[#5E6AD2]/5 to-transparent p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-[#5E6AD2]/20 p-3">
                  <Activity className="h-6 w-6 text-[#929BF0]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    Need help fast?
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-[#8A8F98]">
                    Send a signal and connect with available tutors in seconds.
                    The more urgent your request, the faster you'll get matched.
                  </p>
                </div>
              </div>
            </div>
            <SignalForm />
          </div>
        ) : (
          <div className="space-y-8">
            {isLoadingMy ? (
              <div className="py-20 text-center">
                <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-2xl border-4 border-white/20 border-t-[#5E6AD2]"></div>
                <p className="text-xl text-[#8A8F98]">
                  Loading your signals...
                </p>
              </div>
            ) : mySignals.length > 0 ? (
              <>
                <p className="mb-8 text-lg text-[#8A8F98]">
                  You have {mySignals.length} signal
                  {mySignals.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {mySignals.map((signal: SignalData) => {
                    const config =
                      urgencyConfig[
                        signal.urgency as keyof typeof urgencyConfig
                      ];
                    const timeAgo = new Date(signal.createdAt as string);
                    const now = new Date();
                    const diffMs = now.getTime() - timeAgo.getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    const displayTime =
                      diffMins < 1 ? "Just now" : `${diffMins}m ago`;
                    const cancellable = signal.status === "pending";
                    const statusStyle =
                      statusConfig[
                        signal.status as keyof typeof statusConfig
                      ] || "bg-gray-500/20 border-gray-500/30 text-gray-300";
                    return (
                      <div
                        key={signal.id}
                        className="rounded-2xl border border-white/10 bg-[#141517]/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.05)]"
                      >
                        <div className="mb-6 flex items-start justify-between">
                          <div
                            className={`rounded-xl border-2 px-3 py-1.5 text-xs font-semibold ${config.badge} ${config.bg} ${config.text}`}
                          >
                            {config.label}
                          </div>
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-semibold ${statusStyle}`}
                          >
                            {signal.status.charAt(0).toUpperCase() +
                              signal.status.slice(1)}
                          </span>
                        </div>
                        <div className="mb-8 space-y-4">
                          <span className="inline-block rounded-full border border-indigo-500/40 bg-indigo-500/20 px-4 py-1.5 text-sm font-semibold text-indigo-300">
                            {signal.subject}
                          </span>
                          <p className="line-clamp-3 text-base leading-relaxed text-[#EDEDEF]">
                            {signal.message}
                          </p>
                          <p className="flex items-center gap-1.5 text-sm text-[#8A8F98]">
                            <Clock size={14} />
                            {displayTime}
                          </p>
                        </div>
                        <button
                          className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold shadow-xl transition-all duration-300 active:scale-[0.98] ${
                            cancellable && !deleteSignal.isPending
                              ? "border-0 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_30px_-10px_#ef4444]"
                              : "cursor-not-allowed border border-white/10 bg-white/5 text-[#8A8F98]"
                          }`}
                          disabled={!cancellable || deleteSignal.isPending}
                          onClick={() =>
                            deleteSignal.mutate({ signalId: signal.id })
                          }
                        >
                          {deleteSignal.isPending ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current/50 border-t-current" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <Trash2 size={16} />
                              Cancel Signal
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="py-24 text-center">
                <Activity className="mx-auto mb-8 h-20 w-20 text-white/30" />
                <p className="mb-2 text-3xl font-semibold text-[#EDEDEF]">
                  You don't have any signals yet
                </p>
                <p className="mb-8 text-xl text-[#8A8F98]">
                  Create one above to get help fast
                </p>
                <button
                  onClick={() => setTabActive("create")}
                  className="rounded-xl bg-gradient-to-r from-[#5E6AD2] to-[#929BF0] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_-10px_#5E6AD2]"
                >
                  Create Signal Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips & Stats */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 border-t border-white/10 pt-20 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/5 bg-white/3 p-8 shadow-2xl backdrop-blur-sm">
          <h3 className="flex items-center gap-3 text-xl font-bold text-white">
            <Zap className="h-6 w-6 text-yellow-400" />
            Pro Tips
          </h3>
          <ul className="space-y-3 text-sm text-[#8A8F98]">
            <li className="flex items-center gap-2">
              • Be specific about your question
            </li>
            <li className="flex items-center gap-2">
              • Set the correct urgency level
            </li>
            <li className="flex items-center gap-2">
              • Respond quickly when tutors accept
            </li>
          </ul>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/5 bg-white/3 p-8 shadow-2xl backdrop-blur-sm">
          <h3 className="flex items-center gap-3 text-xl font-bold text-white">
            <Activity className="h-6 w-6 text-emerald-400" />
            Current Stats
          </h3>
          <ul className="space-y-3 text-sm text-[#8A8F98]">
            <li className="flex items-center gap-2">
              • Avg response time: 2-5 minutes
            </li>
            <li className="flex items-center gap-2">
              • 150+ active tutors online
            </li>
            <li className="flex items-center gap-2">• 98% satisfaction rate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
