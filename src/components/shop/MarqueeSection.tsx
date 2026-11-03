"use client";

import React from 'react';

const MarqueeSection: React.FC = () => {
  // The text appearing in the bar
  const message = "SHOP NEW ARRIVALS";

  return (
    <div className="relative flex overflow-x-hidden bg-[#8B5E3C] py-3 border-y border-[#724a2f]">
      {/* We use two containers to create a seamless infinite loop. 
          The 'animate-marquee' class is a custom animation (defined below).
      */}
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-white text-xs font-bold tracking-[0.2em] uppercase">
            + {message} +
          </span>
        ))}
      </div>

      <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap items-center py-3">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-white text-xs font-bold tracking-[0.2em] uppercase">
            + {message} +
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;