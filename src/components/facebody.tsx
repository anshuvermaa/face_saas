"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ActionFace } from "@/app/(dashboard)/(routes)/faceswap/action";
import FileDownload from 'js-file-download'
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface IData {
  url: string;
}

const Facebody = () => {
  const HOST = process.env.NEXT_PUBLIC_FACE_SERVER;

  const [data, setData] = useState<IData>();
  const [content_type, setContent_type] = useState<string | undefined>(
    undefined
  );
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any | null>(null);

  


useEffect(()=>{
})
  function handleChange1(event: any) {
    event.preventDefault();
    setSource(event.target.files[0]);
  }
  function handleChange2(event: any) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const handlefile = async () => {
    setErrorMessage(null);


    const formData = new FormData();
    if (file && source) {
      formData.append("source", source);
      formData.append("target", file);
    }

    try {
      setLoading(true);
      if (file && source) {
        const formData = new FormData();
        formData.append("target", file);
        formData.append("source", source);

        const response= await ActionFace(formData);

        if(response?.error){
          toast.error(response.error)
            throw new Error(response.error);
        }

  

        if(!response || !response.data ){
          throw new Error(`data doest exist ${response}`)
        }
        const {data,content_type}=response


      
        setData(data);

        setContent_type(content_type);
      } else {
        throw new Error("Please upload both source and target files");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error during merging:", error);
      if ((error as any).response) {
        setErrorMessage((error as any).response.data.error);
      } else {
        setErrorMessage((error as any).message);
      }
      setLoading(false);
    }
  };


  if (content_type) {
    content_type.startsWith("video/") ? "video" : "image";
  }

  function handleDownload(e:any){
    e.preventDefault();
    try {
      setLoadingD(true)
      if(!data?.url){
        throw new Error("download url doesn't exist")

      }
      const res= Axios({
        url:`${HOST}/static/${data?.url}`,
        method:"GET",
        responseType:"blob"
      }).then(res=>{
        FileDownload(res.data,data?.url)
      })
    } catch (error:any){
      setError(error)

      
    }
    finally{
      setLoadingD(false)

    }
  }

  return (
    <div className="h-full w-full">
      <div className="gap-2 grid sm:flex  justify-center ">
        <div className="flex items-center justify-center sm:w-[44%] w-full">
          <label
            htmlFor="dropzone-file1"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {/* JPG (MAX. 800x400px) */}
                source image
              </p>
            </div>
            <input
              id="dropzone-file1"
              type="file"
              className="hidden"
              onChange={handleChange1}
            />
          </label>
        </div>
        <div className="my-auto"></div>

        <div className="flex items-center justify-center sm:w-[44%] w-full">
          <label
            htmlFor="dropzone-file2"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                target video or image
              </p>
            </div>
            <input
              id="dropzone-file2"
              type="file"
              className="hidden"
              onChange={handleChange2}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-4 ml-6 gap-y-4">
        <button
          onClick={handlefile}
          className="relative flex ml-30  my-6  justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="px-5 h-[40px] w-[101px] flex justify-center items-center py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {loading ? <Loader2 className=" text-blue-500 animate-spin" /> : "Generate"}
          </span>
        </button>
      </div>
      {errorMessage && (
        <div className="text-red-500 flex justify-center">
          {errorMessage} : Try again
        </div>
      )}
   
      <div className="px-4 lg:px-8 relative w-full  sm:w-[50%] h-full flex mx-auto justify-center ">
        { content_type === "image" && data?.url &&          <Image 
          className=" relative w-full h-full"

          width={1084}
          height={1084}
            src={`${HOST}/static/${data?.url}`} // Assuming the file URL is available
            alt="Media content"
          />
          // <div> hwebghf bbhg nbbwhefg jhbhwjgef nbhwgef nbe bhebnb erh erhvbhfn g e </div>
    
        }
        {content_type === "video" && data?.url && (
          <div>
          <iframe className="w-full h-[100vh]" src={`${HOST}/static/${data?.url}`}></iframe>
          </div>
        )}
      
        {content_type === "unknown" && <p>File type is unknown.</p>}
      </div>
      <div className="flex justify-center p-6">
      {
        data?.url && (content_type !== "unknown") && 
          <>
          <button
          onClick={handleDownload}
          className="flex ml-30   justify-center items-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" >
          {loadingD ? "Downloading..." : "Download"}
          </span>
        </button>
        {error && (
        <div className="text-red-500 flex justify-center">
          {error} : Try again
        </div>
      )}

        </>
      }
      </div>
    </div>
  );
};

export default Facebody;
