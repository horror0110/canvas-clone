import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { userId } = await req.json();

  const chats:any = await prisma.chat.findMany({
    include: {
      messages: true,
    },
  });

  const filteredChats = chats.filter((chat:any) => chat.members.some((member:any) => member.id === userId));

  return NextResponse.json({ data: filteredChats });
};

export const POST = async (req: NextRequest) => {
  const { members } = await req.json();

  const user: any = await currentUser();


  const newMembers = [
    {
      id: user?.id,
      name: user?.firstName + " " + user?.lastName,
      image: user?.imageUrl,
    },
    {
      id: members[0].id,
      name: members[0].name,
      image: members[0].image,
    },
  ];

  await prisma.chat.create({
    data: {
      members: newMembers,
    },
  });

  return NextResponse.json({ success: "chat has been created!" });
};

export const DELETE = async (req: NextRequest) => {
  await prisma.chat.deleteMany();

  return NextResponse.json({ success: "Deleted all chat" });
};
