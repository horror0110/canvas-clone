import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const POST = async (req: Request) => {
  const { imageKey }: any = await req.json();

  try {
    const res = await utapi.deleteFiles(imageKey);

    return NextResponse.json(res);
  } catch (err) {
    console.log("error at uploadthing/delete", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
