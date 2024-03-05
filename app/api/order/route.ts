import { prisma } from "@/libs/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: { ...body },
    });

    return NextResponse.json({
      data: "Order has been created",
    });
  } catch (err) {
    console.log("error at api/teacher", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
