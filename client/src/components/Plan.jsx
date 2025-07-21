import React from "react";
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className="mt-30 mb-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl text-center font-bold text-purple-900 mb-3 sm:text-3xl md:text-4xl">
          Choose Your Plan
        </h2>
        <p className="text-center text-gray-500 text-sm max-w-md mx-auto mb-8 sm:text-base sm:max-w-xl md:max-w-2xl">
         Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-10 sm:px-0">
        <PricingTable/>
      </div>
    </div>
  );
};

export default Plan;
