import prismadb from "./prismadb";
import SubscriptionPlan, { storeSubscriptionPlans } from "@/config/subscriptions";


export async function getPlan(userId: string): Promise<string | undefined> {
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
  });
  const plan = storeSubscriptionPlans.find(
    (plan) => plan.stripePriceId === userSubscription?.stripePriceId
  );
  console.log("fucking plan",plan)
  return plan ? plan.name : undefined;
}
