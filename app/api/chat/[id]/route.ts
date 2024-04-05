

import { prisma } from "@/libs/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const chat = await prisma.chat.findUnique({
    where: { id: id },
    include: {
      messages: true,
    },
  });

  return NextResponse.json({ data: chat });
};


