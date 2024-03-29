import { storeSubscriptionPlans } from "@/config/subscriptions";
import { ManageUserSubscriptionButton } from "./manage-user-subscription-button";
import { getUserSubscriptionPlan } from "@/lib/getSubscription";
import {  currentUser } from "@clerk/nextjs";


let subscriptionPlan:any
let user:any
export default async function SubscriptionSection(){

  try {
    user= await currentUser()
  
  } catch (error) {
    console.log(error)
  }
  if(!user){
    throw Error("user is not valid")
  }

  console.log("user fuck",user.id)

  try {

    subscriptionPlan = await getUserSubscriptionPlan(user.id);
    
  } catch (error) {
    console.log("fck",error)
  }

    return (
      <>
        <div className="bg-[#F4F5FA] p-0 sm:p-10 rounded-xl">
          <div className="flex justify-center mb-8">
            <div className="">
              <h1 className="font-bold text-xl text-green-900">
                Feature Per Use Cost
              </h1>
              <ul className="mt-3 flex flex-col space-y-2">
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-auto w-6 text-green-600 sm:w-7"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    ></path>
                  </svg>
                  <p className="text-base text-slate-700 sm:text-lg">
                    LipSync 1 token
                  </p>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-auto w-6 text-green-600 sm:w-7"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    ></path>
                  </svg>
                  <p className="text-base text-slate-700 sm:text-lg">
                    Faceswap 1 token
                  </p>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-auto w-6 text-green-600 sm:w-7"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    ></path>
                  </svg>
                  <p className="text-base text-slate-700 sm:text-lg">
                    Chatgpt 0.5 token
                  </p>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-auto w-6 text-green-600 sm:w-7"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    ></path>
                  </svg>
                  <p className="text-base text-slate-700 sm:text-lg">
                    Image Generation 1 token
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-12 flex-wrap md:flex-row space-x-0 md:space-x-8 space-y-12  md:space-y-0 justify-center items-center mb-[100px]">
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
                    <span className="font-light text-sm"> {
                    plan.isSubscription ? ("/month") :("/one time")
                  }</span>
                  </div>
                  <ManageUserSubscriptionButton
                    userId={user.id}
                    email={user?.emailAddresses[0].emailAddress || ""}
                    stripePriceId={plan.stripePriceId}
                    plan={plan.name}
                    price={plan.price}
                    limit={plan.tokens}
                    isSubscription={plan.isSubscription}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    isSubscribed={!!subscriptionPlan?.isSubscribed || false}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />

                  {/* <button className="bg-[#F4F5FA] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
                    Subscribe Plan
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}