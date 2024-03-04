import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const student = await prisma.course.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Course has been created" });
  } catch (err) {
    console.log("error at api/courses", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const GET = async (req: Request) => {
  try {
    const courses = await prisma.course.findMany();

    return NextResponse.json({ data: courses });
  } catch (err) {
    console.log("error at api/courses", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
