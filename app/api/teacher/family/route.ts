import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const family = await prisma.family.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Family has been created" });
  } catch (err) {
    console.log("error at api/teacher/family", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
