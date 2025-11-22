"use client";

import { useState } from "react";
import { AlertCircle, Send, Zap } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Literature",
];

type UrgencyLevel = {
  level: number;
  label: string;
  color: string;
};

const urgencyLevels: UrgencyLevel[] = [
  {
    level: 1,
    label: "Low",
    color: "bg-blue-900/20 border-blue-400/50 text-blue-300",
  },
  {
    level: 2,
    label: "Moderate",
    color: "bg-yellow-900/20 border-yellow-400/50 text-yellow-300",
  },
  {
    level: 3,
    label: "High",
    color: "bg-orange-900/20 border-orange-400/50 text-orange-300",
  },
  {
    level: 4,
    label: "Very High",
    color: "bg-red-900/20 border-red-400/50 text-red-300",
  },
  {
    level: 5,
    label: "Critical",
    color: "bg-red-600/30 border-red-500 text-red-200 font-bold",
  },
];

export function SignalForm() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSignalMutation = api.signal.createSignal.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !message.trim()) return;

    setIsSubmitting(true);

    try {
      await createSignalMutation.mutateAsync({
        message,
        subject: selectedSubject,
        urgency,
        status: "pending",
      });

      toast.success("Signal sent! Tutors are being notified...");
      setSelectedSubject("");
      setMessage("");
      setUrgency(3);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create signal. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating signal:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject Selection */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-[#EDEDEF]">
            What subject do you need help with?
          </label>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedSubject === subject
                    ? "scale-105 border-indigo-500 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/25"
                    : "border-white/5 bg-[#141517] text-[#8A8F98] hover:border-white/10 hover:text-white"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Problem/Question */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#EDEDEF]">
            What&apos;s your problem or question?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., I need help solving question 5 WAEC past paper on projectile motion"
            className="h-32 w-full resize-none rounded-xl border border-white/10 bg-[#141517] p-4 text-sm text-white transition-colors duration-200 placeholder:text-[#8A8F98]/70 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none"
            rows={4}
            maxLength={500}
          />
          <p className="mt-1 flex justify-between text-xs text-[#8A8F98]">
            {message.length}/500 characters
          </p>
        </div>

        {/* Urgency Level */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Zap size={18} className="text-indigo-400" />
            <label className="block text-sm font-semibold text-[#EDEDEF]">
              How urgent is your request?
            </label>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {urgencyLevels.map(({ level, label, color }) => (
              <button
                key={level}
                type="button"
                onClick={() => setUrgency(level)}
                className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  urgency === level
                    ? `${color} scale-105 border-current`
                    : `${color} border-transparent opacity-60 hover:opacity-100`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Box */}
        <div className="flex gap-4 rounded-xl border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 p-6 shadow-lg backdrop-blur-sm">
          <AlertCircle size={24} className="mt-1 shrink-0 text-[#929BF0]" />
          <div>
            <p className="text-base font-semibold text-white">
              💬 Your signal will be broadcast to nearby tutors
            </p>
            <p className="mt-1 text-sm text-[#8A8F98]">
              Average response time: 2-5 minutes. Higher urgency gets priority.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedSubject || !message.trim() || isSubmitting}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
            isSubmitting
              ? "cursor-not-allowed bg-indigo-400 text-white"
              : selectedSubject && message.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                : "cursor-not-allowed bg-neutral-200 text-neutral-400"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Sending Signal...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Signal Now
            </>
          )}
        </button>
      </form>
    </div>
  );
}
