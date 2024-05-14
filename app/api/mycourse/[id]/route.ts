import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: any } }
) => {
  const { id }  = params;

  const courses = await prisma.course.findMany({
    where: {
      ownerStudents: {
        has: id,
      },
    },
    include: {
      chapters:true
    }
  });

  return NextResponse.json({ data: courses });
};
