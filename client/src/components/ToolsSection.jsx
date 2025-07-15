import React from "react";
import { AiToolsData } from "./../assets/assets"; // adjust path if needed
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ToolsSection = () => {
    const navigate=useNavigate()
    const {user}=useUser();
  return (
    <div className="px-10 mb-10 sm:px-20 py-0 bg-white text-center">
      <h2 className="text-2xl font-bold text-purple-900 mb-3 sm:text-3xl md:text-4xl">
        Powerful AI Tools
      </h2>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 sm:text-base sm:max-w-xl md:max-w-2xl">
        Everything you need to create, enhance, and optimize your content with
        cutting-edge AI technology.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="bg-white shadow-md hover:-translate-y-1 hover:shadow-lg mb-5 transition-all duration-300 rounded-2xl p-5 text-left cursor-pointer group"
          >
            <div
              className="w-11 h-11 flex items-center justify-center rounded-xl text-white mb-4"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-5 h-5" />
            </div>

            <h3 className="text-base font-semibold text-gray-800 group-hover:text-purple-700 sm:text-lg">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-snug sm:text-sm">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;
