"use client";
import React from 'react';

const BgSection = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-zinc-900 flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale brightness-75 transition-all duration-700 hover:scale-105"
        style={{ 
          backgroundImage: `url('/ring.jpg')`, // Replace with your image path
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Main Heading */}
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] uppercase leading-tight">
          A Judgement Free <br className="hidden md:block" /> Space For All
        </h2>

        {/* Right Action/Label Area */}
        <div className="mt-8 md:mt-0 flex items-center">
          <div className="h-[1px] w-12 bg-white/40 mr-4" />
          <button className="border border-white/40 px-8 py-3 text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default BgSection;