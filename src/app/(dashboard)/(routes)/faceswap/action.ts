"use server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import axios from "axios";

export async function ActionFace(formData:any){
    const HOST = process.env.NEXT_PUBLIC_FACE_SERVER;
    console.log("host", HOST);


    const freeTrial = await checkApiLimit();

   if (!freeTrial) {
     return {
       error: "Please upgrade your plan. You are running out of tokens",
     };
   }

    try {
        const res= await axios
        .post(HOST + "/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })


          await incrementApiLimit(1);
        
       

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

