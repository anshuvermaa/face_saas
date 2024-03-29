import { storeSubscriptionPlans } from "@/config/subscriptions";
import Link from "next/link";
const URL: string = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const LandingPlan=()=>{
    return (
      <>
        <div>
          <div className="">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
              Our Plans
            </h2>
          </div>
          <div className="flex flex-col gap-12 md:flex-row flex-wrap space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mb-[100px]">
            {storeSubscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-[#FFFBEC] min-w-[20%] rounded-xl"
              >
                <div className="flex flex-col p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-80 md:w-auto">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ice_logo.svg/138px-Ice_logo.svg.png?20191213230535"
                    className="w-8"
                  />
                  <div className="mt-3 font-semibold text-3xl">{plan.name}</div>
                  <div className="text-lg font-medium ">
                    {plan.tokens} tokens
                  </div>
                  <div className="my-4">
                    <span className="font-bold text-base">
                      $ {plan.price},-
                    </span>
                    <span className="font-light text-sm">
                      {plan.isSubscription ? "/month" : "/one time"}
                    </span>
                  </div>

                  <button className="bg-[#cbcedb] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                    <Link href={`${URL}/settings`}>
                      {plan.isSubscription ? "Subscribe Plan" : "one time"}
                      
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}



export default LandingPlan