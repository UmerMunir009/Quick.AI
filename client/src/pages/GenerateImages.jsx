import React, { useState } from "react";
import { Edit, Hash, Image, Sparkles } from "lucide-react";

const GenerateImages = () => {
  const styles = [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Potrait Style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [publish, setPublish] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#1eea3d]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Desscibe your image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in Image..."
          required
        />
        <p className="mt-6 text-md font-medium">Style</p>

        <div className="my-5 flex flex-wrap gap-3">
          {styles.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={item}
              className={`text-xs border-1 border-gray-400 cursor-pointer rounded-2xl p-2 ${
                selectedStyle === item ? "bg-green-500 text-white" : ""
              }
              `}
            >
              {item}
            </span>
          ))}
        </div>

        {/*Toggle button  */}
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>

            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <div className="flex justify-center">
          <button className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#37ce26] to-[#015923] text-white px-4 py-2 rounded-2xl ">
            <Image className="w-5 " /> Generate Image
          </button>
        </div>
      </form>

      {/* Right Column - Placeholder (add your content here) */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex justify-center  items-center gap-2 text-sm  px-4 py-2 rounded-2xl ">
          <Image className="w-5 text-green-500 " />
          <p className="font-bold"> Generated Image</p>
        </div>

        <div
          className={`h-90 overflow-y-scroll flex flex-col text-center ${
            generatedImage
              ? "items-start justify-start "
              : "items-center justify-center"
          }  items-center gap-2`}
        >
          {!generatedImage && <Image className="w-5 text-gray-400 " />}
          {generatedImage ? (
            <p className="text-xs">{generatedImage}</p>
          ) : (
            <p className="text-gray-400 text-xs">
              Enter the description and click "Generate Image" to get Image
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
