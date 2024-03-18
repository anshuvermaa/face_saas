"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { manageStripeSubscriptionAction } from "@/app/_actions/stripe";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
  plan: string;
  limit: number;
  isSubscription:boolean
  price:number
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
  plan,
  limit,
  isSubscription,
  price
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const session = await manageStripeSubscriptionAction({
          email,
          price,
          userId,
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripePriceId,
          plan,
          limit,
          isSubscription,
        });
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing";
        }
      } catch (err) {
        console.error("error fuck", (err as Error).message);
        toast.error("Something went wrong");
      }
    });
  };

  console.log("plans are", isCurrentPlan);

  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isCurrentPlan && <span>Manage Subscription</span>}
        {!isCurrentPlan && isSubscription && <span>Subscribe Plan</span>}
        {!isCurrentPlan && !isSubscription && <span>One Time</span>}
      </Button>
    </form>
  );
}
