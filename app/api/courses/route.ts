import { prisma } from "@/libs/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const course = await prisma.course.create({
      data: { ...body },
    });

    return NextResponse.json({ data: "Course has been created" });
  } catch (err) {
    console.log("error at api/courses", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const priceFilterType: any = searchParams.get("price");
  const dateFilterType: any = searchParams.get("date");
  const ownerStudentsCount: any = searchParams.get("sale");

  try {
    let orderBy: any[] = [];

    // Apply sorting based on query parameters
    if (searchParams.has("price")) {
      orderBy.push({ price: priceFilterType });
    }
    if (searchParams.has("date")) {
      orderBy.push({ createdAt: dateFilterType });
    }
    if (searchParams.has("sale")) {
      orderBy.push({ studentCount: ownerStudentsCount });
    }

    const courses: any = await prisma.course.findMany({
      orderBy: orderBy,
      include: {
        chapters: true,
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

    console.log(id);

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
        studentCount: {
          increment: 1,
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
