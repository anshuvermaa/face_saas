"use server";
import axios from "axios";
import { CloudCog } from "lucide-react";
import { string } from "zod";

export async function ActionLip(formData:any) {
    const HOST = process.env.NEXT_PUBLIC_LIP_SERVER;
    // console.log("host", HOST);

    try {
        const  response = await axios
        .post(HOST + "/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("response is ",response.data)

        if(!response || !response.data){
            throw new Error(`response data doesn't exist Error is: ${response}`)
    
         }
         console.log("this is below")
        return response.data
    } catch (error) {
        console.log("error thrown")
        throw error
        
    }
}