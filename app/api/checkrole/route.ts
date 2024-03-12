import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const POST = async (req: NextRequest) => {
  const { role } = await req.json();

  const { sessionClaims } = auth();
  
  if (sessionClaims?.metadata.role === role) {
    return NextResponse.json({ success: "Role true" });
  } else {
    return NextResponse.json({ fail: "role fail" });
  }
};
