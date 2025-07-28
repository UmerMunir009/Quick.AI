import React, { useState, useEffect } from "react";
import { Edit, Sparkles } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import MarkDown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {toast} from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short : 400 to 800 words" },
    { length: 1200, text: "Medium : 800 to 1200 words" },
    { length: 3500, text: "Long : 1200+ words" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0].length);
  const [input, setInput] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} `;
      const response = await axios.post("/ai/generate-article",{ prompt, length: selectedLength },{
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if(response.data.statusCode === 200){
      setGeneratedArticle(response.data.data.content);
      }
      else{
        toast.error(response.data.message)
      }
      
      setLoading(false);
    } catch (error) {
          toast.error(error.message)
      
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200"
      >
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
          <button
            disabled={loading}
            className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#226BEE] to-[#65ADFF] text-white px-4 py-2 rounded-2xl "
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5 " />
            )}
            Generate Article
          </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4  bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center items-center gap-2 text-sm px-4 py-2 rounded-2xl ">
          <Edit className="w-5 text-blue-500 " />
          <p className="font-bold">Generated Article</p>
        </div>

        <div
          className={`h-90 overflow-y-scroll flex ${generatedArticle || loading
              ? "items-start justify-start"
              : "items-center justify-center"
          } gap-2`}
        >
          {loading ? (
            <div className="w-full space-y-2">
              <Skeleton height={22} count={10} />
            </div>
          ) : !generatedArticle ? (
            <>
              <Edit className="w-5 text-gray-400 " />
              <p className="text-gray-400 text-xs">
                Enter a topic and click "Generate Article" to get started
              </p>
            </>
          ) : (
            <div className="reset-tw ">
              <MarkDown>{generatedArticle}</MarkDown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
