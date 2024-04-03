"use client";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import { InputText } from "primereact/inputtext";
import axios from "axios";

import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";

const Messenger = () => {
  const [chat, setChat] = useState<any>({ messages: [] }); // Corrected initial state

  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    fetch("/api/messenger", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setChat({ messages: data })) // Set chat with messages object
      .catch((err) => console.log(err));
  }, []);

  const sendMessage = () => {
    fetch("/api/messenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: "user1",
        text: inputMessage,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setInputMessage("");
        }
        return response.json(); 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    pusherClient.subscribe("chat");

    const handleMessage = (newMessage: any) => {
      setChat((prevChat: any) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe("chat");
      pusherClient.unbind("new-message", handleMessage);
    };
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl m-20">Та асуух зүйлээ үлдээнэ үү</h1>

      <div className="flex gap-10 max-w-[1700px] w-screen">
        <div className="bg-gray-100 rounded-md p-2 w-[40%] h-max">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-5">
              <Image
                alt="avatar"
                src="/images/avatar.png"
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold ">Phuc Mai</h1>
                <span className="text-[15px]">Are you excited too?</span>
              </div>
            </div>
            <span className=" text-gray-500">3:03 PM</span>
          </div>
        </div>

        <div className="bg-gray-100 p- 5rounded-md w-full">
          {chat.messages.map((message: any, index: number) => ( // Access messages array
            <div key={index}>
              <p>{message.text}</p>
            </div>
          ))}
          <div className="flex items-center justify-between mt-10 bg-white p-2">
            <div className="flex items-center gap-2">
              <RiImageAddFill size={30} color="gray" />
              <InputText
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="outline-none bg-transparent"
              />
            </div>
            <div
              onClick={sendMessage}
              className="bg-mainColor rounded-full p-2 cursor-pointer"
            >
              <IoMdSend size={30} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
