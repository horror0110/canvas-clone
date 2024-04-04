"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";
import axios from "axios";

const Messenger = () => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

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

  const handleMessageSend = async () => {
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

  return (
    <div>
      <div>
        {messages?.map((message: any, index: number) => (
          <div key={index}>
            <p>
              {message.senderId}: {message.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default Messenger;
