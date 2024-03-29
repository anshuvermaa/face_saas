export default interface SubscriptionPlan {
  id: string;
  name: string;
  tokens: number;
  stripePriceId: string;
  price: number;
  isSubscription: boolean;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "AI Silver",
    name: "AI Silver",
    tokens: 10,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_SILVER_PRICE_ID ?? "",
    price: 0.95,
    isSubscription: true,
  },
  {
    id: "AI Gold",
    name: "AI Gold",
    tokens: 25,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_GOLD_PRICE_ID ?? "",
    price: 1.95,
    isSubscription: true,
  },
  {
    id: "AI Platinum",
    name: "AI Platinum",
    tokens: 100,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PLATINUM_PRICE_ID ?? "",
    price: 4.95,
    isSubscription: true,
  },
  {
    id: "SingleSpend",
    name: "AI Tokens",
    tokens: 25,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ONETIME_PRICE_ID ?? "",
    price: 1.95,
    isSubscription: false,
  },
];
