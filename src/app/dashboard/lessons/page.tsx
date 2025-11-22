"use client";

import { BookOpen } from "lucide-react";

export default function LessonsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-4xl space-y-10 p-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] shadow-[0_0_30px_-10px_#5E6AD2]">
            <BookOpen className="h-6 w-6 fill-current text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white">
              Lessons
            </h1>
            <p className="text-[#8A8F98]">
              Your scheduled lessons and learning progress in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="py-12 text-center">
        <BookOpen className="mx-auto mb-8 h-20 w-20 text-[#8A8F98]" />
        <h2 className="mb-4 text-2xl font-medium text-[#EDEDEF]">
          No lessons scheduled yet
        </h2>
        <p className="mx-auto max-w-md leading-relaxed text-[#8A8F98]">
          Book your first lesson with a tutor to unlock personalized learning
          sessions and track your progress over time.
        </p>
        <button className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#5E6AD2] px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_#5E6AD2]">
          Book Your First Lesson
        </button>
      </div>
    </div>
  );
}
