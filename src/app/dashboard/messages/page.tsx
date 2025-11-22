"use client";

import { MessageSquare } from "lucide-react";
import { ConversationList } from "../_components/conversation-list";

export default function MessagesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-4xl space-y-10 p-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] shadow-[0_0_30px_-10px_#5E6AD2]">
            <MessageSquare className="h-6 w-6 fill-current text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white">
              Messages
            </h1>
            <p className="text-[#8A8F98]">
              Your conversations with tutors and real-time chat history.
            </p>
          </div>
        </div>
      </div>

      <ConversationList />
    </div>
  );
}
