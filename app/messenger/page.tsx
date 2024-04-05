"use client";
import { useEffect, useRef, useState } from "react";

import ChatList from "../components/ChatList";

const Messenger = () => {
  useEffect(() => {
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
          alert("created chat");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-5 w-screen">
      <div className=" ">
        <div className="">
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
