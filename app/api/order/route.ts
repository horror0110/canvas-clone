import { prisma } from "@/libs/prismadb";
import { auth } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { price, products } = await req.json();

    const { userId } = auth();

    const newOrder: any = {
      products: products,
      price: price,

      userId: userId,
    };

    const order = await prisma.order.create({
      data: newOrder,
    });

    return NextResponse.json({
      data: "Order has been created",
    });
  } catch (err) {
    console.log("error at api/order", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const orders = await prisma.order.findMany();

    return NextResponse.json({
      data: orders,
    });
  } catch (err) {
    console.log("error at api/order", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
