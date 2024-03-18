import { Settings } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionSection from "@/components/subscriptionSection";
import { getPlan } from "@/lib/plan";

const SettingsPage = async () => {

  const {userId}=await auth()
  const plan=await getPlan(userId||"")
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className=" px-0 sm:px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-2xl">
          {plan ? `You are currently on a ${plan}.` : "You are currently on a free plan."}
        </div>
        <SubscriptionSection />
      </div>
    </div>
   );
}
 
export default SettingsPage;

