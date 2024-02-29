import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const student = await prisma.student.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Student has been created" });
  } catch (err) {
    console.log("error at api/student", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        families: true,
      },
    });

    return NextResponse.json({ data: students });
  } catch (err) {
    console.log("error at api/student", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
