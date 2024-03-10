import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const course = await prisma.course.findUnique({
    where: { id: id },
    include: {
      videos: true,
    },
  });

  return NextResponse.json({ data: course });
};
