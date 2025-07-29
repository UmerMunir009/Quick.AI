import React, { useState } from "react";
import { Edit, Hash, Sparkles } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import MarkDown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {toast} from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Health",
    "Technology",
    "Business",
    "Education",
    "LifeStyle",
    "Travel",
    "Food",
  ];
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for keyword ${input} in the category ${selectedCategory} `;
      const response = await axios.post("/ai/generate-blogTitle", { prompt },{
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      setGeneratedTitles(response.data.data.content);
      
    } catch (error) {
       if (error.response) {
              toast.error(error.response.data.message);
            } else if (error.request) {
              toast.error("No response from server.");
            } else {
              // unknown or setup error
              toast.error("Unexpected error occurred.");
            }
    }finally{
      setLoading(false);
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
          <Sparkles className="w-6 text-[#c81eea]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <p className="mt-6 text-sm font-medium">Category</p>

        <div className="my-5 flex flex-wrap gap-3">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              key={item}
              className={`text-xs border-1 border-gray-400 cursor-pointer rounded-2xl p-2 ${
                selectedCategory === item ? "bg-purple-400 text-white" : ""
              }
              `}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <button disabled={loading} className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#c81eea] to-[#65ADFF] text-white px-4 py-2 rounded-2xl ">
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Hash className="w-5 " />
            )}
            Generate Titles
          </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center items-center gap-2 text-sm px-4 py-2 rounded-2xl">
          <Hash className="w-5 text-purple-500" />
          <p className="font-bold">Generated Titles</p>
        </div>

        <div
          className={`h-90 overflow-y-scroll flex flex-col text-center ${
            generatedTitles || loading
              ? "items-start justify-start"
              : "items-center justify-center"
          } gap-2`}
        >
          {loading ? (
            <div className="w-full space-y-2">
              <Skeleton  height={20} count={10} />
            </div>
          ) : generatedTitles ? (
            <div className="text-sm">
              <div className="reset-tw">
              <MarkDown>{generatedTitles}</MarkDown>
            </div>
            </div>
          ) : (
            <>
              <Hash className="w-5 text-gray-400" />
              <p className="text-gray-400 text-xs">
                Enter a topic and click "Generate Title" to get started
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
