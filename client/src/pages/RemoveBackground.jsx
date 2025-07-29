import React, { useState } from "react";
import { Edit, Eraser, Hash, Sparkles } from "lucide-react";
import {useAuth} from '@clerk/clerk-react'
import axios from 'axios'
import "react-loading-skeleton/dist/skeleton.css";
import {toast} from 'react-hot-toast'
import FormData from "form-data";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [processedImage,setProcessedImage]=useState('')
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const submitHandler=async (e)=>{
    e.preventDefault()
     try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);
      const response = await axios.post("/ai/remove-background",formData,{
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if(response.data.statusCode === 200){
      setProcessedImage(response.data.data.content);
      }
      else{
     
        toast.error(response.data.message)
      }
      
    } catch (error) {
          toast.error('Something went wrong')
      
    }finally{
      setLoading(false);
    }
    console.log(generatedImage)
  }
 
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}
      
      <form onSubmit={submitHandler} className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])} accept="image/*"
          type='file'
          className="w-full cursor-pointer p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />
        <p className="mt-2 text-xs text-gray-400">Supports PNG,JPG nad other formats</p>

       
        <div className="flex justify-center mt-8">
          <button disabled={true} className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 rounded-2xl ">
         {
          loading?<span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>:<Eraser className="w-5 " />
         }
           Remove Background
        </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
          <Eraser className="w-5 text-[#FF4938] " />
          <p className="font-bold"> Processed Image</p>
        </div>

        <div className={`h-90 overflow-y-scroll flex flex-col text-center ${processedImage?'items-start justify-start ':'items-center justify-center'}  items-center gap-2`}>
          {!processedImage && (<Eraser className="w-5 text-gray-400 " />)}
          {processedImage?<img src={processedImage} alt="" />:<p className="text-gray-400 text-xs">
            {
              loading?'This will take few seconds...':'Choose an image and click "Remove Background" to get started'
            }
            </p>}

        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
