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
    color: "bg-blue-100 border-blue-300 text-blue-900",
  },
  {
    level: 2,
    label: "Moderate",
    color: "bg-yellow-100 border-yellow-300 text-yellow-900",
  },
  {
    level: 3,
    label: "High",
    color: "bg-orange-100 border-orange-300 text-orange-900",
  },
  {
    level: 4,
    label: "Very High",
    color: "bg-red-100 border-red-300 text-red-900",
  },
  {
    level: 5,
    label: "Critical",
    color: "bg-red-200 border-red-400 text-red-950 font-bold",
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
      const result = await createSignalMutation.mutateAsync({
        message,
        subject: selectedSubject,
        urgency,
        status: "pending",
      });

      // Show success message based on broadcast status
      if (result.broadcastSuccess) {
        toast.success("Signal sent! Tutors are being notified...");
      } else {
        toast.success(
          "Signal created! Tutors will see it soon (real-time notifications temporarily unavailable).",
        );
      }

      setSelectedSubject("");
      setMessage("");
      setUrgency(3);
    } catch (err) {
      // Provide user-friendly error messages
      let errorMessage = "Something went wrong. Please try again.";

      if (err instanceof Error) {
        // Check for specific error types
        if (err.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (err.message.includes("unauthorized")) {
          errorMessage = "You need to be logged in to send a signal.";
        } else if (err.message.includes("validation")) {
          errorMessage = "Please check your input and try again.";
        } else {
          errorMessage = err.message;
        }
      }

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
          <label className="mb-3 block text-sm font-semibold text-neutral-900">
            What subject do you need help with?
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedSubject === subject
                    ? "scale-105 bg-indigo-600 text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Problem/Question */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-900">
            What&apos;s your problem or question?
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., I need help solving question 5 WAEC past paper on projectile motion"
            className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            rows={4}
            maxLength={500}
          />
          <p className="mt-2 text-xs text-neutral-500">
            {message.length}/500 characters
          </p>
        </div>

        {/* Urgency Level */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Zap size={18} className="text-indigo-600" />
            <label className="block text-sm font-semibold text-neutral-900">
              How urgent is your request?
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {urgencyLevels.map(({ level, label, color }) => (
              <button
                key={level}
                type="button"
                onClick={() => setUrgency(level)}
                className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  urgency === level
                    ? `${color} scale-105 border-current shadow-lg`
                    : `${color} border-transparent opacity-60 hover:opacity-100`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Box */}
        <div className="flex gap-3 rounded border-l-4 border-blue-500 bg-blue-50 p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              💬 Your signal will be broadcast to nearby tutors
            </p>
            <p className="mt-1 text-xs text-blue-700">
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
