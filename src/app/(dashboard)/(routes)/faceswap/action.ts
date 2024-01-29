"use server";
import axios from "axios";

export async function ActionFace(formData:any){
    const HOST = process.env.NEXT_PUBLIC_FACE_SERVER;
    console.log("host", HOST);

    try {
        const res= await axios
        .post(HOST + "/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        if(!res || !res.data){
            throw new Error(`resonse or response data isn't exit Error is: ${res}`)
        }

          return {
            data: res.data,
            content_type: res.headers["content-type"].startsWith("video/")
              ? "video"
              : "image",
          };
        
    
    } catch (error) {
        throw error
    }

}
