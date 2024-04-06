"use client";
import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import { useUser } from "@clerk/nextjs";

const Messenger = () => {
  const [loading, setLoading] = useState(false);
  const [successChat, setSuccessChat] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!loading && !successChat) {
      setLoading(true); // Set loading to true before sending request

      fetch("/api/checkchat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log(data); // Set loading back to false after receiving response

          if (data.success) {
            console.log("success");
            setSuccessChat(true);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false); // Set loading back to false if request fails
        });
    }
  }, [user?.id, loading, successChat]); // Add successChat as a dependency

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
            console.log("added chat");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [successChat]);

  return (
    <div className="m-5 w-screen">
      <div className="">
        <ChatList />
      </div>
    </div>
  );
};

export default Messenger;
