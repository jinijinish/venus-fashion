"use client";
import React from 'react';

const ShopSection: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex items-center bg-[#fdfaf7]">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/brdls.webp" 
          alt="Model wearing Silver and Diamond Earrings"
          className="w-full h-full object-cover object-[25%_center]" // Adjusts focus to the model's face
        />
        {/* Subtle gradient overlay for elegance */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - Left Aligned */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex justify-start">
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col space-y-4 md:space-y-6">
            
            {/* Luxury badge with serif font */}
            <span className="font-serif text-[11px] md:text-xs tracking-[0.35em] text-[#a67c4f] uppercase font-medium">
              Stand Out In Style
            </span>
            
            {/* Main heading with luxury serif fonts */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.1] tracking-tight">
              Silver And 
              <span className="block mt-2 font-serif italic font-light text-[#a67c4f]">Diamond Earrings</span>
            </h1>

            {/* Elegant category listing */}
            <p className="font-sans text-[11px] md:text-xs text-[#6b6b6b] tracking-[0.25em] font-light uppercase">
              Designer Jewellery • Necklaces • Bracelets • Earrings
            </p>

            {/* Refined CTA section */}
            <div className="pt-6 md:pt-10">
              <button className="group relative bg-transparent border border-[#a67c4f] text-[#a67c4f] hover:text-white px-8 py-3 md:px-10 md:py-3.5 uppercase text-[10px] tracking-[0.25em] transition-all duration-500 overflow-hidden">
                <span className="relative z-10 font-medium">Shop Now</span>
                <span className="absolute inset-0 bg-[#a67c4f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </button>
              
              {/* Optional: Add a subtle line for extra elegance */}
              <div className="hidden md:block w-16 h-px bg-[#a67c4f]/30 mt-6"></div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Optional: Add an elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-2">
        <span className="text-[8px] tracking-[0.3em] text-[#a67c4f]/40 uppercase font-light">Discover</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#a67c4f]/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default ShopSection;