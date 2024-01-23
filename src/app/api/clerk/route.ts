import { clerkClient } from "@clerk/nextjs";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();
  if(payload.type==="user.created"){
  if(payload.data.id){
    const {id} =payload.data
    console.log("payload is this data",payload);
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          plan:"free"
        }
      })
    }

  }
  return Response.json({ message: "Received" });
}
export async function GET() {
  return Response.json({ message: "Hello World!" });
}
