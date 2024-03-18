"use client";
import React from "react";
import Axios from "axios";
import { useState } from "react";
import { ActionLip } from "@/app/(dashboard)/(routes)/lipsync/action";
import fileDownload from "js-file-download";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
// import { ActionLip } from "@/app/(dashboard)/(routes)/lipsync/action";

interface IResponse{
  videoPath:string
  error?:string
}

const Lipbody = () => {
  const HOST = process.env.NEXT_PUBLIC_LIP_SERVER;
  // console.log("host", HOST);

  const [fileUrl, setFileUrl] = useState(null);
  let response:IResponse;
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const [videoPath, setVideoPath] = useState("");
  const [videoName, setVideoName] = useState("");
  

  function handleChange1(event: any) {
    event.preventDefault();
    setAudio(event.target.files[0]);
  }
  function handleChange2(event: any) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const handlefile = async () => {
    setErrorMessage(null);


    const formData = new FormData();
    if (file && audio) {
      formData.append("audio", audio);
      formData.append("video", file);
    }

    try {
      setLoading(true);
      if (file && audio) {
        const formData = new FormData();
        formData.append("video", file);
        formData.append("audio", audio);

        response =JSON.parse(JSON.stringify(await ActionLip(formData))) 

          if (response?.error) {
            toast.error(response.error);
            throw new Error(response.error)
          }


  

      } else {
        throw new Error("Please upload both audio and video files");
      }
      setLoading(false);
      setVideoName(response.videoPath)

      setVideoPath(`${HOST}/static/${response!.videoPath}`);

    } catch (error) {
      console.error("Error during merging:", error);
      if ((error as any).response) {
        setErrorMessage((error as any).response.data.error);
      } else {
        console.log("error massege is ",error)
        setErrorMessage(error);
      }
      setLoading(false);
    }
  };

  function handleDownload(e:any){
    e.preventDefault();
    try {
      setLoadingD(true)
      if(!videoPath){
        throw new Error("download url doesn't exist")

      }
      const res= Axios({
        url:`${videoPath}`,
        method:"GET",
        responseType:"blob"
      }).then(res=>{
        fileDownload(res.data,videoName)
      })
    } catch (error:any){
      setError(error)

      
    }
    finally{
      setLoadingD(false)

    }
  }

  return (
    <div>
      <div className="gap-2 gap-2 grid sm:flex justify-center ">
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
                audio in wav formate
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
                image or mp4 video
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
      <div className="flex justify-center mt-4 ml-6 gap-y-3">
        <button
          onClick={handlefile}
          className="relative flex ml-30   justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="px-5 h-[40px] w-[101px] flex justify-center items-center py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {loading ? <Loader2 className=" text-blue-500 animate-spin" /> : "Generate"}
          </span>
        </button>
      </div>
      {errorMessage && (
        <div className="text-red-500 flex justify-center">
          {errorMessage.toString()} : Try again
        </div>
      )}
      <div className="p-4">
        {videoPath && (
          <iframe
            allowFullScreen={true}
            className="h-[100vh] w-full"
            src={videoPath}
          ></iframe>
        )}
      </div>
      <div className="flex justify-center p-6">
      {
        videoPath &&           <>
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

export default Lipbody;
