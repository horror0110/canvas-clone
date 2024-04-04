"use client";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/libs/pusher";
import axios from "axios";
import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import { InputText } from "primereact/inputtext";

const Messenger = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const list = [
    {
      image: "/images/avatar.png",
      name: "Mark David",
      message: "Hello",
    },
    {
      image: "/images/avatar.png",
      name: "John Wall",
      message: "Whats up",
    },
  ];

  useEffect(() => {
    fetch("/api/messenger", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));
  }, []);

  const handleMessageSend: any = async (e: any) => {
    try {
      await axios.post("/api/messenger", {
        message: inputValue,
        chatId: "ganaa",
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
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe("ganaa");
      pusherClient.unbind("new-message", handleMessage);
    };
  }, []);

    /* Scrolling down to the bottom when having the new message */

    const bottomRef:any = useRef(null);

    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [messages]);

  return (
    <div className="m-5 w-screen">
      <div className="flex gap-5 w-full ">
        <div className="flex flex-col gap-3 w-[30%] bg-gray-200 p-2">
          {list.map((el, index) => (
            <div key={index} className="flex gap-2">
              <Image src={el.image} alt="avatar" width={50} height={50} />
              <div className="flex flex-col">
                <span>{el.name}</span>
                <span>{el.message}</span>
              </div>

              <span>1:44 PM</span>
            </div>
          ))}
        </div>
        <div className="w-[70%] max-h-[600px] overflow-y-scroll">
          {messages?.map((message: any, index: number) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/avatar.png"
                  width={40}
                  height={40}
                  alt="avatar"
                />
                <span>{message.senderId}</span>
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
    </div>
  );
};

export default Messenger;
