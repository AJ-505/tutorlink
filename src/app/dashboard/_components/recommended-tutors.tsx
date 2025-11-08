"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { TutorCard } from "./tutor-card";

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
    return <div>Loading...</div>;
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
