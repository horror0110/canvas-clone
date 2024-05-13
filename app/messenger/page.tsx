"use client";
import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import { useUser } from "@clerk/nextjs";

const Messenger = () => {
  const [loading, setLoading] = useState(false);
  const [successChat, setSuccessChat] = useState(false);
  const [chatCreated, setChatCreated] = useState(false);
  const { user } = useUser();

  const isAdmin = user?.id === "user_2d2dgGmgCc23Uapqt9u86GgmdsO";

  useEffect(() => {
    if (!loading && !successChat) {
      setLoading(true);

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

          if (data.success) {
            console.log("success");
            setSuccessChat(true);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    if (successChat && !chatCreated && !isAdmin) {
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
            setChatCreated(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.id, loading, successChat, chatCreated]);

  return (
    <div className="m-5 w-screen">
      <div className="">
        <ChatList admin="user_2d2dgGmgCc23Uapqt9u86GgmdsO" currentUser={user?.id}  />
      </div>
    </div>
  );
};

export default Messenger;
