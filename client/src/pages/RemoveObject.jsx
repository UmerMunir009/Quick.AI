import React, { useState } from "react";
import {Scissors, Sparkles,Download } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
import FormData from "form-data";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [removalDescription,setRemovalDescription]=useState('');
  const [processedImage,setProcessedImage]=useState('')
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const submitHandler=async (e)=>{
    e.preventDefault()
    try {
      setLoading(true);
      if(removalDescription.split(' ').length>1){
         return toast.error('Please enter only 1 object name')
      }
      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", removalDescription);
      const response = await axios.post("/ai/remove-object", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
        setProcessedImage(response.data.data.content);
  
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from server.");
      } else {
        // unknown or setup error
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setInput('')
      setRemovalDescription('')
      setLoading(false);
    }
    
  }


  const downloadImage = async () => {
      try {
        const response = await fetch(processedImage);
        const blob = await response.blob();
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-image.jpg";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        toast.error("Failed to download image.");
        console.error("Download error:", err);
      }
    };
 
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}
      
      <form onSubmit={submitHandler} className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])} accept="image/*"
          type='file'
          className="w-full cursor-pointer p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />
        <p className="mt-2 text-xs text-gray-400">Supports PNG,JPG nad other formats</p>

         <p className="mt-6 text-xs font-medium">Desscibe your Object to remove</p>
        <textarea
          onChange={(e) => setRemovalDescription(e.target.value)}
          rows={5}
          value={removalDescription}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g watch or spoon and something like that...."
          required
        />

       
        <div className="flex justify-center mt-8">
          <button disabled={loading} className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 rounded-2xl ">
          {
            loading?<span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>:<Scissors className="w-5 " /> 
          }
          Remove Object
        </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-between  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
         <div className="flex justify-center items-center gap-1">
           <Scissors className="w-5 text-[#4538ff] " />
          <p className="font-bold"> Processed Image</p>
         </div>
         {processedImage ? (
            <Download
              onClick={downloadImage}
              className="cursor-pointer text-green-600 hover:text-green-800"
            ></Download>
          ) : (
            <div></div>
          )}
        </div>

        <div className={`h-90 overflow-y-scroll flex flex-col text-center ${processedImage?'items-start justify-start ':'items-center justify-center'}  items-center gap-2`}>
          {!processedImage && (<Scissors className="w-8 text-gray-400 " />)}
          {processedImage? <img className=" w-full" src={processedImage} alt="" />:<p className="text-gray-400 text-xs">{loading?'This will take few seconds...':'Choose an image and click "Remove Object" to get started'}</p>}

        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
