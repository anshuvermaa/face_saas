/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9ef9V0WWEYd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


"use client"
import { getUserGeneratedData } from "@/app/_actions/generateDataAction"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Empty } from "@/components/ui/empty"
import { Tabs } from "@/components/ui/tabs"
import { FolderDot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"



const FACE_API=process.env.NEXT_PUBLIC_FACE_SERVER || ""
const LIP_API=process.env.NEXT_PUBLIC_LIP_SERVER || ""
export interface UserGeneratedData {
    id: string;
    userId: string;
    type: string;
    url: string;
    contentType:string;
    timeTaken: number;
    createdAt: Date;
  }
  const userGeneratedData: UserGeneratedData[] = [
    {
      id: "example_id_1",
      userId: "user_id_1",
      type: "face",
      url: "https://example.com/image1.jpg",
      contentType: "image",
      timeTaken: 10,
      createdAt: new Date("2024-03-31T12:00:00Z")
    },
    {
      id: "example_id_2",
      userId: "user_id_2",
      type: "lip",
      url: "https://example.com/video1.mp4",
      contentType: "video",
      timeTaken: 15,
      createdAt: new Date("2024-03-30T10:30:00Z")
    },
    // Add more examples here...
    {
      id: "example_id_3",
      userId: "user_id_3",
      type: "lip",
      url: "https://example.com/video2.mp4",
      contentType: "video",
      timeTaken: 20,
      createdAt: new Date("2024-03-29T08:45:00Z")
    },
    {
      id: "example_id_4",
      userId: "user_id_4",
      type: "face",
      url: "https://example.com/image2.jpg",
      contentType: "image",
      timeTaken: 12,
      createdAt: new Date("2024-03-28T15:20:00Z")
    },
    // Add more examples...
    {
      id: "example_id_19",
      userId: "user_id_19",
      type: "lip",
      url: "https://example.com/video9.mp4",
      contentType: "video",
      timeTaken: 18,
      createdAt: new Date("2024-03-27T14:10:00Z")
    },
    {
      id: "example_id_20",
      userId: "user_id_20",
      type: "face",
      url: "https://example.com/image20.jpg",
      contentType: "image",
      timeTaken: 8,
      createdAt: new Date("2024-03-26T16:30:00Z")
    },
    {
        id: "example_id_5",
        userId: "user_id_1",
        type: "face",
        url: "https://example.com/image1.jpg",
        contentType: "image",
        timeTaken: 10,
        createdAt: new Date("2024-03-31T12:00:00Z")
      },
      {
        id: "example_id_6",
        userId: "user_id_2",
        type: "lip",
        url: "https://example.com/video1.mp4",
        contentType: "video",
        timeTaken: 15,
        createdAt: new Date("2024-03-30T10:30:00Z")
      },
      // Add more examples here...
      {
        id: "example_id_7",
        userId: "user_id_3",
        type: "lip",
        url: "https://example.com/video2.mp4",
        contentType: "video",
        timeTaken: 20,
        createdAt: new Date("2024-03-29T08:45:00Z")
      },
      {
        id: "example_id_8",
        userId: "user_id_4",
        type: "face",
        url: "https://example.com/image2.jpg",
        contentType: "image",
        timeTaken: 12,
        createdAt: new Date("2024-03-28T15:20:00Z")
      },
      // Add more examples...
      {
        id: "example_id_23",
        userId: "user_id_19",
        type: "lip",
        url: "https://example.com/video9.mp4",
        contentType: "video",
        timeTaken: 18,
        createdAt: new Date("2024-03-27T14:10:00Z")
      },
      {
        id: "example_id_27",
        userId: "user_id_20",
        type: "face",
        url: "https://example.com/image20.jpg",
        contentType: "image",
        timeTaken: 8,
        createdAt: new Date("2024-03-26T16:30:00Z")
      },
  ];
  

export default function Component() {
    const [toggle,setToggle]=useState<boolean>(false)
    const [res,setRes]=useState<UserGeneratedData[]>([])
    const [content,setContent]=useState<UserGeneratedData[]>([])
    const [loading,setLoading]=useState<boolean>(true)
    useEffect(()=>{
        const filterTerm= !toggle?"face":"lip"
        const newData=res.filter(item=>item.type===filterTerm)
        console.log("newdata",newData,res)
        setContent(newData)
    },[toggle,res])
    useEffect(()=>{
        console.log("constent",content,res)
    },[content,res])
    useEffect(()=>{
      try {
        const getData=async()=>{
         const response= await getUserGeneratedData()
         if(!response){
           return
          }
          console.log("res",response)
          setRes(response)
          setToggle(false)
          setLoading(false)
        }
        getData()
        
      } catch (error) {
        console.log(error)
        
      }
    },[])
  return (
    <div className="flex flex-col">
    <Heading
        title="Gallery"
        description="All Of Your's Generated Content."
        icon={FolderDot}
        iconColor="text-red-700"
        bgColor="bg-slate-700/10"
      />
        
    <div className="flex h-screen">
   
      <div className="flex-1 p-4">
        <Tabs>
          <div className="mb-4 flex space-x-2">
            <Button className="flex-1"  variant={!toggle?"secondary":"ghost"} onClick={()=>{
                setToggle(!toggle)}
                }>
              Faceswap
            </Button>
            <Button className="flex-1" variant={toggle?"secondary":"ghost"} onClick={()=>setToggle(!toggle)}>
              Lipsync
            </Button>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {
                (content && content.length>0)?(
                    content.map(item=>{
                      console.log("gi",`${(!toggle)?(FACE_API):(LIP_API)}/${item.url}`)
                        return (
                        <Card key={item.id} className="w-full"> 
                        <Link href={`${(!toggle)?(FACE_API):(LIP_API)}/static/${item.url}`} rel="noopener noreferrer" target="_blank">
                          {
                            item.contentType==="image" ? (
                                <Image
                                    alt="Face"
                                    className="w-full h-auto"
                                    height="200"
                                    src={`${(!toggle)?(FACE_API):(LIP_API)}/static/${item.url}`}
                                    style={{
                                      aspectRatio: "300/200",
                                      objectFit: "cover",
                                    }}
                                    width="300"
                                    />): (
                                      <video
                                          className="w-full h-auto"
                                          height={200}
                                          src={`${!toggle ? FACE_API : LIP_API}/static/${item.url}`}
                                          style={{
                                            aspectRatio: "300/200",
                                            objectFit: "cover",
                                          }}
                                          width={300}
                                          controls
                                        />
                                    )

                          }
                          </Link>
                                <div className="w-full px-5 py-2.5 flex justify-between">
                                  <div>
                                  <span className="font-semibold">Created at {": "}</span>
                                  {`${item.createdAt.toISOString().slice(0,10)}`}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Time taken {": "}</span>
                                    {Math.round(item.timeTaken / 1000)} Seconds
                                  </div>

                                </div>
                                </Card>
                                )
                    })

                ):(!loading)?(
                  <Empty label="No Data Available." />):("")
            }
          </div>
        </Tabs>
      </div>
    </div>
    </div>
  )
}

