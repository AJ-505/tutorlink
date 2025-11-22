"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { TutorCard } from "./tutor-card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendedTutors() {
  const router = useRouter();
  const { data: tutors, isLoading } = api.student.getTutorMatches.useQuery();
  const createConversation = api.chat.createConversation.useMutation();

  const handleStartChat = async (tutorId: string) => {
    const { conversationId } = await createConversation.mutateAsync({
      tutorId,
    });
    router.push(`/dashboard/messages/${conversationId}`);
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-3 text-xl font-semibold text-white">
          Recommended Tutors
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group rounded-xl border border-white/5 bg-[#141517] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-full bg-white/5" />
                <div className="flex-1">
                  <div className="mb-2 h-5 w-32 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
              </div>
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-white">
        Recommended Tutors
      </h2>
      {tutors && tutors.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              name={tutor.user.name ?? ""}
              subjects={[]}
              yearsOfExperience={tutor.yearsOfExperience}
            >
              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors hover:bg-white/10"
                  onClick={() => router.push(`/dashboard/tutors/${tutor.id}`)}
                >
                  View Profile
                </button>
                <button
                  className="flex-1 rounded-lg bg-[#5E6AD2] px-4 py-2 text-white transition-colors hover:bg-[#4F60C4]"
                  onClick={() => handleStartChat(tutor.userId)}
                >
                  Start Chat
                </button>
              </div>
            </TutorCard>
          ))}
        </div>
      ) : (
        <div className="text-sm text-[#8A8F98]">No recommended tutors yet.</div>
      )}
    </div>
  );
}
