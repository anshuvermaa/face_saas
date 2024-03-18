import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import {  getApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { getPlan } from "@/lib/plan";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {userId}=await auth()
  const plan=await getPlan(userId||'')
  
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const limit=await getApiLimit()

  return ( 
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar isPro={isPro} limit={limit} plan={plan} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;
