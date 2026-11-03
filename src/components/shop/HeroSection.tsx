"use client";

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-[#f3f4f6]">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-left-top"
        style={{ 
          // Replace with your actual hosted image path
          backgroundImage: `url('/brdl.jpg')`, 
        }}
      >
        {/* Subtle overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-white/10 md:bg-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-end text-right">
        <div className="max-w-md space-y-4">
          <span className="block text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500 font-medium">
            New Arrival
          </span>
          
          <h1 className="text-4xl md:text-6xl font-serif text-gray-800 leading-tight">
            Flower Power
          </h1>
          
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Introducing our new mesmerizing jewelry collection. 
            Embrace your inner allure with timeless elegance.
          </p>
          
          <div className="pt-4">
            <button className="px-8 py-3 border border-gray-800 text-gray-800 text-sm font-semibold uppercase tracking-widest hover:bg-gray-800 hover:text-white transition-colors duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;