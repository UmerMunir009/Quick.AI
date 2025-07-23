import React, { useState } from "react";
import { Edit, Eraser, FileText, Hash, Paperclip, PartyPopperIcon, Sparkles } from "lucide-react";

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [processedImage,setProcessedImage]=useState('')
  const submitHandler=async (e)=>{
    e.preventDefault()
  }
 
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}
      
      <form onSubmit={submitHandler} className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          onChange={(e) => setInput(e.target.files[0])} accept="application/pdf"
          type='file'
          className="w-full cursor-pointer p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />
        <p className="mt-2 text-xs text-gray-400">Supports PDF only</p>

       
        <div className="flex justify-center mt-8">
          <button className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 rounded-2xl ">
         
          <FileText className="w-5 " /> Review Resume
        </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
          <FileText className="w-5 text-[#00DA83] " />
          <p className="font-bold"> Analysis Results</p>
        </div>

        <div className={`h-90 overflow-y-scroll flex flex-col text-center ${processedImage?'items-start justify-start ':'items-center justify-center'}  items-center gap-2`}>
          {!processedImage && (<FileText className="w-8 text-gray-400 " />)}
          {processedImage?<p className="text-xs">{processedImage}</p>:<p className="text-gray-400 text-xs">Upload resume and  click "Review Resume" to get started</p>}

        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
