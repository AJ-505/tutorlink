"use client";

import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "@clerk/nextjs";

const socket = io("http://localhost:9000");

export default function ChatPage() {
  const { conversationId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { data: messages, refetch } = api.chat.getMessages.useQuery({
    conversationId: conversationId as string,
  });
  const sendMessage = api.chat.sendMessage.useMutation();
  const [content, setContent] = useState("");

  const otherUser = messages?.[0]?.conversation?.User.find(
    (u) => u.id !== user?.id,
  );

  useEffect(() => {
    socket.emit("join", conversationId);

    socket.on("message", () => {
      void refetch();
    });

    return () => {
      socket.off("message");
    };
  }, [conversationId, refetch]);

  const handleSendMessage = () => {
    sendMessage.mutate(
      {
        conversationId: conversationId as string,
        content,
      },
      {
        onSuccess: () => {
          socket.emit("message", conversationId, content);
          setContent("");
        },
      },
    );
  };

  const handleCall = () => {
    if (otherUser) {
      router.push(`/dashboard/calls?userId=${otherUser.id}`);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">{otherUser?.name}</h1>
        <button
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
          onClick={handleCall}
        >
          Call
        </button>
      </div>
      <div className="flex-1 space-y-4 p-4">
        {messages?.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div>
              <p className="font-semibold">{message.sender.name}</p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
