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
        <h2 className="mb-3 text-xl font-semibold text-neutral-900">
          Recommended Tutors
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
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
      <h2 className="mb-3 text-xl font-semibold text-neutral-900">
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
                  className="rounded-lg bg-gray-200 px-4 py-2"
                  onClick={() => router.push(`/dashboard/tutors/${tutor.id}`)}
                >
                  View Profile
                </button>
                <button
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                  onClick={() => handleStartChat(tutor.userId)}
                >
                  Start Chat
                </button>
              </div>
            </TutorCard>
          ))}
        </div>
      ) : (
        <div className="text-sm text-neutral-500">
          No recommended tutors yet.
        </div>
      )}
    </div>
  );
}
