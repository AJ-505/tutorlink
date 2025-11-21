"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function ConversationList() {
  const router = useRouter();
  const { data: conversations, isLoading } =
    api.chat.getConversations.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4"
          >
            <Skeleton className="mb-2 h-5 w-48" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations?.length
        ? conversations?.map((conversation) => (
            <div
              key={conversation.id}
              className="cursor-pointer rounded-lg border p-4"
              onClick={() =>
                router.push(`/dashboard/messages/${conversation.id}`)
              }
            >
              <p className="font-semibold">
                {conversation.User.map((user) => user.name).join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                {conversation.messages[0]?.content}
              </p>
            </div>
          ))
        : "No conversations"}
    </div>
  );
}
