"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

interface ManageStripeSubscriptionActionProps {
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan: boolean;
  stripePriceId: string;
  email: string;
  userId: string;
  plan: string;
  limit: number;
  isSubscription:boolean
  price:number
}

export const manageStripeSubscriptionAction = async ({
  isSubscribed,
  stripeCustomerId,
  isCurrentPlan,
  stripePriceId,
  email,
  userId,
  plan,
  limit,
  isSubscription,
  price
}: ManageStripeSubscriptionActionProps) => {
  const billingUrl = absoluteUrl("/settings");

  if (isSubscribed && stripeCustomerId && isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }
  if(isSubscription){
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: email,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        plan: plan,
        limit: limit,
        type: "subscription",
      },
    });
  
    return { url: stripeSession.url };

  } else{
       const stripeSession = await stripe.checkout.sessions.create({
         success_url: billingUrl,
         cancel_url: billingUrl,
         mode:"payment",
         customer_email: email,
         line_items: [
           {
             price: stripePriceId,
             quantity: 1,
           },
         ],
         metadata: {
           "userId": userId,
           "plan": plan,
           "limit": limit,
           "type": "one time",
         },
       });

       return { url: stripeSession.url };

  }
};
