"use client";
import { useEffect, useRef, useState } from "react";

import ChatList from "../components/ChatList";
import { useUser } from "@clerk/nextjs";

const Messenger = () => {
  const [successChat, setSuccessChat] = useState<any>(false);

  const { user } = useUser();

  useEffect(() => {
    fetch("/api/checkchat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: user?.id, // Changed to user.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
           console.log("success")
          setSuccessChat(true);
        } else if (data.error) {
          console.log("error")
          setSuccessChat(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(successChat)
  useEffect(() => {
    if (successChat) {
      fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          members: [
            {
              id: "user_2d2dgGmgCc23Uapqt9u86GgmdsO",
              name: "Gan-Erdene Ganbat",
              image:
                "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZDJkZ0p1aHpqSXFIWkJobXc5dEhJb2N4UUsifQ",
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("added chat")
           
          }
        })
        .catch((err) =>  {console.log(err) , setSuccessChat(false) });
    }
  }, []);

  return (
    <div className="m-5 w-screen">
      <div className="">
        <ChatList />
      </div>
    </div>
  );
};

export default Messenger;
