import {  clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
) {
  try {
    const users = await clerkClient.users.getUserList();
    return NextResponse.json(users)
  } catch (error) {
    console.log('[error is ]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
