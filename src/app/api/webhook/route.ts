import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import {clerkClient} from "@clerk/nextjs";


import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }
    if (session?.metadata?.type === "subscription") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )
      await prismadb.userSubscription.create({
        data: {
          userId: session?.metadata?.userId,
          plan: session?.metadata?.plan,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });

      const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: session?.metadata?.userId },
      });
  
      if (userApiLimit) {
        await prismadb.userApiLimit.update({
          where: { userId: session?.metadata?.userId },
          data: { 
           limit:Number(session?.metadata?.limit),
           count:0,
  
         },
        });
      } else {
        await prismadb.userApiLimit.create({
          data: {
            userId: session?.metadata?.userId,
            limit: Number(session?.metadata?.limit),
          },
        });
      }
      await clerkClient.users.updateUserMetadata(
        session?.metadata?.userId || "",
        {
          publicMetadata: {
            plan: session?.metadata?.plan,
          },
        }
      );
    }else{
      if (!session?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }
      const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: session?.metadata?.userId },
      });

      if (userApiLimit) {
        await prismadb.userApiLimit.update({
          where: { userId: session?.metadata?.userId },
          data: {
            limit: userApiLimit.limit + Number(session?.metadata?.limit),
          },
        });
      } else {
        await prismadb.userApiLimit.create({
          data: {
            userId: session?.metadata?.userId,
            limit: Number(session?.metadata?.limit),
          },
        });
      }
    }

  }
 
    if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await prismadb.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });

      const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: session?.metadata?.userId },
      });

      if (userApiLimit) {
        await prismadb.userApiLimit.update({
          where: { userId: session?.metadata?.userId },
          data: { limit: Number(session?.metadata?.limit), count: 0 },
        });
      }

      await clerkClient.users.updateUserMetadata(
        session?.metadata?.userId || "",
        {
          publicMetadata: {
            plan: session?.metadata?.plan,
          },
        }
      );
    }

  return new NextResponse(null, { status: 200 })
};
