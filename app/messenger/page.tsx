"use client";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import { InputText } from "primereact/inputtext";
import axios from "axios";

import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";


const channel = pusherClient.subscribe("chat");
const Messenger = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    axios.get("/api/messenger").then((response) => {
      setMessages(response.data);
    });

    channel.bind("message", (data: any) => {
      setMessages((prevMessages: any) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = async () => {
    const response = await axios.post("/api/messenger", {
      senderId: "user1",
      text: inputMessage,
    });

    setMessages((prevMessages: any) => [...prevMessages, response.data]);
    setInputMessage("");
  };
  return (
    <div>
      <h1 className="font-bold text-xl m-20">Та асуух зүйлээ үлдээнэ үү</h1>

      <div className="flex gap-10 max-w-[1700px] w-screen">
        <div className="bg-gray-100 rounded-md p-2 w-[40%] h-max ">
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

        <div className="bg-gray-100 p-5 rounded-md w-full">
          {/* <div className="flex items-start gap-3">
            <Image
              alt="avatar"
              src="/images/avatar.png"
              width={30}
              height={30}
              className="object-contain"
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <h1 className="font-bold text-[14px] ">Phuc Mai</h1>

                <span className=" text-gray-500 text-[14px]">3:03 PM</span>
              </div>

              <span className="text-[15px] bg-white rounded-md p-2 font-semibold">
                Are you excited too?
              </span>
            </div>
          </div> */}

          {messages.map((message: any) => (
            <div key={message.id}>
              <p>{message.text}</p>
            </div>
          ))}
          <div className="flex items-center justify-between mt-10 bg-white p-2">
            <div className="flex items-center gap-2 ">
              <RiImageAddFill size={30} color="gray" />

              <InputText
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="outline-none bg-transparent "
              />
            </div>
            <div className="bg-mainColor rounded-full p-2">
              <IoMdSend onClick={sendMessage} size={30} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
