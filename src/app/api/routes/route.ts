import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";
 
export async function POST(req: NextRequest) {
  const body=await req.json()
  const {userId,plan} = body
  if (!userId || !plan) {

    return NextResponse.json({ error: 'plane or userId is Missing from request body' }, { status: 400 });
  }
  const UpdatedPlan=await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan
    }
  })
  return NextResponse.json(
    {
     success: true }
     );
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
