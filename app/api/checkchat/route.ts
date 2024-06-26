import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { AnyARecord } from "dns";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();

  const user = await currentUser();

  console.log(user?.id);


  const allChats: any = await prisma.chat.findMany();

  const existingItems = allChats.filter((chat: any) => {
    return (
      chat.members.some((member: any) => member.id === user?.id) &&
      chat.members.some(
        (member: any) => member.id === "user_2d2dgGmgCc23Uapqt9u86GgmdsO"
      )
    );
  });

  if (existingItems.length > 1) {
    return NextResponse.json({ error: "This chat already created" });
  }

  return NextResponse.json({ success: "Success" });
};
