"use server";
import axios from "axios";
import { CloudCog } from "lucide-react";
import { string } from "zod";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function ActionLip(formData:any) {
    const HOST = process.env.NEXT_PUBLIC_LIP_SERVER;
    // console.log("host", HOST);

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return {
        error:"Please upgrade your plan. You are running out of tokens"
      }
    }


    try {
        const  response = await axios
        .post(HOST + "/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

          await incrementApiLimit(1);
     


        return response.data
    } catch (error) {
        console.log("error thrown",error)
        if(error instanceof Error){
          return ({ error: error.message });
        }
        
    }
}