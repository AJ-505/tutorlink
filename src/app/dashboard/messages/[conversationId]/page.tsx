import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChatView } from "./_components/chat-view";

export async function generateStaticParams() {
  return [{ conversationId: "__placeholder__" }];
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;

  if (conversationId === "__placeholder__") {
    notFound();
  }

  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" /></div>}>
      <ChatView conversationId={conversationId} />
    </Suspense>
  );
}
