"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { TutorCard } from "./tutor-card";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TutorWithUser {
  id: string;
  user: { id: string; name: string | null; email: string | null };
  subjectInterests: string[];
  yearsOfExperience: number;
}

export function TutorSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<TutorWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = api.tutor.searchByUsername.useQuery(
    { query: query.trim() },
    { enabled: false },
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      const res = await refetch();
      setResults((res.data as TutorWithUser[]) ?? []);
      setIsOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tutors by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="group relative w-full rounded-lg border border-white/10 bg-[#141517] px-4 py-3 pl-10 text-sm text-white placeholder-[#8A8F98] transition-all focus-within:border-[#5E6AD2]/50 focus-within:ring-1 focus-within:ring-[#5E6AD2]/50 focus:outline-none"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5E6AD2]/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
          <Search className="absolute top-3 left-3 h-4 w-4 text-[#8A8F98]" />
        </div>
      </form>

      {/* Search Results Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#141517] shadow-2xl">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Search Results
                </h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setResults([]);
                  }}
                  className="text-[#8A8F98] hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-6">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="group rounded-xl border border-white/5 bg-[#141517] p-4 transition-all hover:-translate-y-1 hover:border-white/10"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="h-12 w-12 animate-pulse rounded-full bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 w-32 animate-pulse rounded bg-white/5" />
                          <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                        <div className="h-3 w-3/4 animate-pulse rounded bg-white/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="text-center text-[#8A8F98]">
                  No tutors found matching &quot;{query}&quot;
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {results.map((tutor) => (
                    <TutorCard
                      key={tutor.id}
                      name={tutor.user?.name ?? "Tutor"}
                      subjects={tutor.subjectInterests}
                      yearsOfExperience={tutor.yearsOfExperience}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
