"use server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { NextResponse } from "next/server";

export async function ActionFace(formData:any){
    const HOST = process.env.NEXT_PUBLIC_FACE_SERVER;
    console.log("host", HOST);


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return {error:"Free trial has expired. Please upgrade to pro."};
    }
    try {
        const res= await axios
        .post(HOST + "/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })


        if (!isPro) {
          await incrementApiLimit();
        }
       

          return {
            data: res.data,
            content_type: res.headers["content-type"].startsWith("video/")
              ? "video"
              : "image",
          };
        
    
    } catch (error) {
      console.log("error thrown",error)
      if(error instanceof Error){
        return ({ error: error.message });
      }
    }

}
