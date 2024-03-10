import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const video = await prisma.video.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Video has been created" });
  } catch (err) {
    console.log("error at api/video", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
