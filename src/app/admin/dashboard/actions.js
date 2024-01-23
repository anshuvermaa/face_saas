import { checkRole } from "@/lib/role";
import axios from "axios";

export async function getUsers() {

    if (!checkRole("admin")) {
        return { message: "Not Authorized" };
      }
    try {
        const response = await axios.get('https://5053-117-219-22-193.ngrok-free.app/api/users');
        console.log("data is ",)
        // console.dir(response.data, { depth: 2 });
        return response.data; // Access parsed JSON data
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to allow for further handling
      }
   
}
