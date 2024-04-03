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
  try {
    const { senderId, text } = await req.json();
    const message = await prisma.message.create({
      data: {
        text,
        senderId,
      },
    });
  
   await pusherServer.trigger("chat", "new-message", message);
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error creating message:", error);

  }
};
