"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

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
            className="rounded-lg border border-white/10 bg-[#141517] p-4 backdrop-blur-sm"
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
      {conversations?.length ? (
        conversations?.map((conversation) => (
          <div
            key={conversation.id}
            className="group cursor-pointer rounded-xl border border-white/10 bg-[#141517] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:shadow-xl hover:shadow-[#5E6AD2]/10"
            onClick={() =>
              router.push(`/dashboard/messages/${conversation.id}`)
            }
          >
            <p className="truncate font-semibold text-white">
              {conversation.User.map((user) => user.name).join(", ")}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-[#8A8F98]">
              {conversation.messages[0]?.content}
            </p>
          </div>
        ))
      ) : (
        <div className="py-12 text-center">
          <MessageSquare className="mx-auto mb-4 h-16 w-16 text-[#8A8F98]" />
          <p className="mb-2 text-xl font-medium text-[#EDEDEF]">
            No conversations yet
          </p>
          <p className="text-[#8A8F98]">
            Start a new conversation when a tutor accepts your signal
          </p>
        </div>
      )}
    </div>
  );
}
