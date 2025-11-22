"use client";
import dynamic from "next/dynamic";

const TutorSearch = dynamic(
  () => import("./_components/tutor-search").then((mod) => mod.TutorSearch),
  {
    loading: () => (
      <div className="group relative">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5E6AD2]/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
        <div className="relative flex h-12 items-center rounded-lg border border-white/10 bg-[#141517] px-4 transition-all focus-within:border-[#5E6AD2]/50 focus-within:ring-1 focus-within:ring-[#5E6AD2]/50">
          <Search className="mr-3 h-4 w-4 text-[#8A8F98]" />
          <div className="h-4 w-32 flex-1 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    ),
    ssr: false,
  },
);

const RecommendedTutors = dynamic(
  () =>
    import("./_components/recommended-tutors").then(
      (mod) => mod.RecommendedTutors,
    ),
  {
    loading: () => (
      <div className="animate-in fade-in slide-in-from-bottom-4 min-h-screen space-y-12 bg-[#0B0C0E] p-8 text-[#EDEDEF] duration-700">
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group rounded-xl border border-white/5 bg-[#141517] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-white/5" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                    <div className="h-2 w-16 animate-pulse rounded bg-white/5" />
                  </div>
                </div>
                <div className="h-4 w-4 animate-pulse rounded bg-white/5 opacity-0" />
              </div>
              <div className="mb-4 space-y-2">
                <div className="h-2 w-full animate-pulse rounded bg-white/5" />
                <div className="h-2 w-3/4 animate-pulse rounded bg-white/5" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1/3 animate-pulse rounded bg-white/5" />
                <div className="h-6 w-1/3 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    ssr: false,
  },
);

export default function DashboardHome() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 min-h-screen space-y-12 bg-[#0B0C0E] p-8 text-[#EDEDEF] duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight text-white">
          Welcome back, John!
        </h1>
        <p className="text-lg text-[#8A8F98]">Jump back into learning</p>
      </div>

      <TutorSearch />

      <RecommendedTutors />
    </div>
  );
}

import { Search } from "lucide-react";
