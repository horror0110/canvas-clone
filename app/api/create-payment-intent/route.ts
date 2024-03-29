import { prisma } from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100000,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log("error at api/create-payment-intent", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
