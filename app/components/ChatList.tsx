"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    fetch("/api/chat", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => setChats(data.data))
      .catch((err) => console.log(err));
  }, [chats]);

  return (
    <div className="max-h-[600px] overflow-y-scroll">
      {chats.map((chat: any, index) => (
        <div
          key={index}
          onClick={() => router.push(`/messenger/${chat.id}`)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100"
        >
          <Image
            src={chat.members[1].image}
            alt="avatar"
            width={50}
            height={50}
          />

          <span>{chat.members[1].name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;