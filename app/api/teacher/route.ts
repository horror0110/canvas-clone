import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const teacher = await prisma.teacher.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Teacher has been created" });
  } catch (err) {
    console.log("error at api/teacher", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        families:true
      }
    });

    return NextResponse.json({ data: teachers });
  } catch (err) {
    console.log("error at api/teacher", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
