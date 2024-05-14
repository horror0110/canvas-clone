import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const chapter = await prisma.chapter.create({
    data: { ...body },
  });

  return NextResponse.json({ data: "Chapter has been created" });
};

export const GET = async (req: NextRequest) => {
  const chapters = await prisma.chapter.findMany();

  return NextResponse.json({ data: chapters });
};
