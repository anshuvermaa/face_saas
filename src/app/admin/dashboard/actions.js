import { checkRole } from "@/lib/role";
import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";

export async function getUsers() {
  const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";  
  // const host ="http://localhost:3000";  


    if (!checkRole("admin")) {
        return { message: "Not Authorized" };
      }
    try {
        const response = await axios.get(`${host}/api/users`);
        // console.dir(response.data, { depth: 2 });
        return response.data; // Access parsed JSON data
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to allow for further handling
      }
   
}


export async function getCount() {

  let silver = 0;
  let gold = 0;
  let Platinum = 0;
  let free = 0;
  
  
    const usersList  = await clerkClient.users.getUserList();
  // const = await getUsers();
  console.log("fuck it",usersList)

   usersList.forEach((user) => {
     switch (user.publicMetadata.plan) {
       case "AI Silver":
         silver++;
         break;
       case "AI Gold":
         gold++;
         break;
       case "AI Platinum":
         Platinum++;
         break;
       default:
         free++;
         break;
     }
   });

   return {
     silver: silver,
     gold: gold,
     platinum: Platinum,
     free: free,
     total:usersList.length
   };


}
