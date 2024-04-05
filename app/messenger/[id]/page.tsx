"use client";
import ChatList from "@/app/components/ChatList";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { pusherClient } from "@/libs/pusher";
import Image from "next/image";

const SingleChatPage = ({ params }: any) => {
  const [chat, setChat] = useState([]);

  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const { user }: any = useUser();

  useEffect(() => {
    fetch(`/api/chat/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setChat(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  useEffect(() => {
    fetch(`/api/chat/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMessages(data.data.messages))
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleMessageSend: any = async (e: any) => {
    try {
      await axios.post("/api/messenger", {
        message: inputValue,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        chatId: params.id,
      });
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
    1;
  };

  useEffect(() => {
    pusherClient.subscribe("ganaa");

    const handleMessage = (newMessage: any) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe("ganaa");
      pusherClient.unbind("new-message", handleMessage);
    };
  }, []);

  /* Scrolling down to the bottom when having the new message */

  const bottomRef: any = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  console.log(messages);
  return (
    <div className="flex gap-10 w-screen m-5">
      <div className="w-[30%]">
        <ChatList />
      </div>

      <div className="w-[70%] max-h-[600px] overflow-y-scroll">
        {messages?.map((message: any, index: number) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              <Image
                src={message.userImage}
                width={40}
                height={40}
                alt="avatar"
              />
              <span>{message.userName}</span>
              <span>10:50AM</span>
            </div>

            <p className="text-white bg-purple-800 rounded-md p-2 w-max my-3">
              {message.text}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />

        <div className="bg-gray-200 flex items-center gap-3  rounded-md p-3  sticky bottom-0 left-0 w-full">
          <InputText
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            id="username"
            aria-describedby="username-help"
            className="border border-gray-500 w-full py-2"
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green-500 rounded-full p-2"
            onClick={handleMessageSend}
          >
            <IoMdSend size={30} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleChatPage;
