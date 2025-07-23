import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";

const WriteArticle = () => {
  const articleLength = [
    { length: 600, text: "Short : 400 to 600 words" },
    { length: 1000, text: "Medium : 600 to 1000 words" },
    { length: 1500, text: "Long : 1200+ words" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0].length);
  const [input, setInput] = useState("");
  const [generatedArticle,setGeneratedArticle]=useState('')
  const submitHandler=async (e)=>{
    e.preventDefault()
  }
 
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}
      
      <form onSubmit={submitHandler} className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <p className="mt-6 text-sm font-medium">Article Length</p>

        <div className="my-5 flex flex-wrap gap-3">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item?.length)}
              key={index}
              className={`text-xs border-1 border-gray-400 cursor-pointer rounded-2xl p-2 ${
                selectedLength === item?.length ? "bg-blue-900 text-white" : ""
              }`}
            >
              {item?.text}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="flex justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#226BEE] to-[#65ADFF] text-white px-4 py-2 rounded-2xl ">
         
          <Edit className="w-5 " /> Generate Article
        </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
          <Edit className="w-5 text-blue-500 " />
          <p className="font-bold"> Generated Article</p>
        </div>

        <div className={`h-90 overflow-y-scroll flex ${generatedArticle?'items-start justify-start ':'items-center justify-center'}  items-center gap-2`}>
          {!generatedArticle && (<Edit className="w-5 text-gray-400 " />)}
          {generatedArticle?<p className="text-xs">{generatedArticle}</p>:<p className="text-gray-400 text-xs">Enter a topic and click "Generate Article" to get started</p>}

        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
