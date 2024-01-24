import { checkRole } from "@/lib/role";
import axios from "axios";

export async function getUsers() {
  const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";  

    if (!checkRole("admin")) {
        return { message: "Not Authorized" };
      }
    try {
        const response = await axios.get(`${host}/api/users`);
        console.log("data is ",)
        // console.dir(response.data, { depth: 2 });
        return response.data; // Access parsed JSON data
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to allow for further handling
      }
   
}
