import { prisma } from "@/libs/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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
    const courses = await prisma.course.findMany({
      include: {
        videos: true,
      },
    });

    return NextResponse.json({ data: courses });
  } catch (err) {
    console.log("error at api/courses", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { userId }: any = auth();

    const { id } = await req.json();

    const updatedCourse = await prisma.course.updateMany({
      where: {
        id: {
          in: id,
        },
      },
      data: {
        ownerStudents: {
          push: userId,
        },
      },
    });

    if (updatedCourse.count > 0) {
      return NextResponse.json({ data: "Added course owner" });
    } else {
      return new NextResponse("Course not found", { status: 404 });
    }
  } catch (err) {
    console.error("Error at PUT /api/course", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
