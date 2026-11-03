"use client";

import React from 'react';

const brands = [
  { id: 1, name: 'LUMINA', icon: '✦' },
  { id: 2, name: 'AURELIA', icon: '◎' },
  { id: 3, name: 'VALERIA', icon: '◒' },
  { id: 4, name: 'ELARA', icon: '≈' },
  { id: 5, name: 'ORISSA', icon: '🛡️' },
];

const CTASection = () => {
  return (
    <section className="w-full bg-[#f2e8cf] py-6 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8">
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 opacity-80">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="flex items-center space-x-1 sm:space-x-2 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {/* Logo Icon - Using text symbols to mimic the image style */}
              <span className="text-xl sm:text-2xl font-bold text-[#3d3125]">
                {brand.icon}
              </span>
              
              {/* Brand Name */}
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#3d3125] font-serif">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;