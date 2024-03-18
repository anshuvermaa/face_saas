import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import Link from "next/link";

const Navbar = async () => {
  const user = await currentUser()
  // Use `user` to render user details or create UI elements

console.dir(user, { depth: null })
const role=user?.publicMetadata.role
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <div className="flex px-2 gap-4 justify-center items-center">
          {role==="admin" && (
            <Link href={"/admin/dashboard"}>
              <div className="">admin</div>
            </Link>
          
          )}
        <UserButton afterSignOutUrl="/" />

        </div>
      </div>
    </div>
   );
}
 
export default Navbar;