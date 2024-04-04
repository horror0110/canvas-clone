"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

import { pusherServer } from "@/libs/pusher";

export const GET = async (req: NextRequest) => {
  try {
    const messages = await prisma.message.findMany();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { message, chatId } = body;

  try {
    const newMessage = await prisma.message.createMany({
      data: {
        text: message,
        senderId: "ganaa",
      },
    });

    const newMessageData = {
      text: message,
      senderId: "ganaa",
    };

    await pusherServer.trigger("ganaa", "new-message", newMessageData);

    return NextResponse.json(
      { message: "Message sent success" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
};
