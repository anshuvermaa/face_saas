"use server"
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";


export async function createFaceData(params:any) {
    const {userId} =auth()
    if(!userId){
      return;
    }
    await prismadb.userGeneratedData.create({
      data:{
        userId:userId,
        type:params.type,
        url:params.url,
        contentType:params.contentType,
        timeTaken:params.timeTaken
      }
    })
  }
  
  export async function getUserGeneratedData() {
    const {userId}=auth();
    if(!userId){
      return [];
    }
    try {
      const data=await prismadb.userGeneratedData.findMany({
        where:{userId:userId},
      })
      return data;
    } catch (error) {
      console.log("error",error)
      return []
    }
  }
  