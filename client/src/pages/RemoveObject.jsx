import React, { useState } from "react";
import {Scissors, Sparkles } from "lucide-react";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [removalDescription,setRemovalDescription]=useState('');
  const [processedImage,setProcessedImage]=useState('')
  const submitHandler=async (e)=>{
    e.preventDefault()
  }
 
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
          <button className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 rounded-2xl ">
         
          <Scissors className="w-5 " /> Remove Object
        </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
          <Scissors className="w-5 text-[#4538ff] " />
          <p className="font-bold"> Processed Image</p>
        </div>

        <div className={`h-90 overflow-y-scroll flex flex-col text-center ${processedImage?'items-start justify-start ':'items-center justify-center'}  items-center gap-2`}>
          {!processedImage && (<Scissors className="w-8 text-gray-400 " />)}
          {processedImage?<p className="text-xs">{processedImage}</p>:<p className="text-gray-400 text-xs">Choose an image and click "Remove Object" to get started</p>}

        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
