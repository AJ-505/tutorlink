"use client";

import { ConversationList } from "../_components/conversation-list";

export default function MessagesPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-neutral-900">Messages</h1>
      <ConversationList />
    </div>
  );
}
