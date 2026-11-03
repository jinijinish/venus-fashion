"use client";
import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="bg-[#fdfbf9] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Minimalist Image Composition */}
        <div className="relative flex justify-center">
          {/* Subtle decorative element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border border-amber-200/50 rounded-full" />
          </div>
          
          {/* Main Image Container - smaller and more refined */}
          <div className="relative z-10 w-72 h-72 md:w-120 md:h-120 rounded-full overflow-hidden shadow-sm">
            <img 
              src="/gs.jpg" 
              alt="Elegant jewelry detail" 
              className="w-full h-full object-cover object-center"
            />
            
            {/* Minimalist ring accent */}
            <div className="absolute inset-0 ring-1 ring-white/30 ring-inset" />
          </div>

          {/* Tiny diamond accent */}
          <div className="absolute -top-2 -right-2 text-amber-700/60 text-xl">
            ✦
          </div>

          {/* Subtle line decoration */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-px bg-amber-200/80" />
        </div>

        {/* Right Side: Refined Content */}
        <div className="flex flex-col space-y-8 md:pl-6">
          {/* Minimalist badge */}
          <div className="space-y-4">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-amber-700/80 
                           border-b border-amber-200 pb-2">
              Fine Jewelry
            </span>
            
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 leading-tight">
              Welcome to
              <span className="block text-amber-800/90 mt-1">Elegance</span>
            </h2>
          </div>
          
          {/* Concise, elegant description */}
          <p className="text-gray-600 leading-relaxed max-w-md text-sm">
            Where exceptional craftsmanship meets minimalist design. 
            Each piece tells a story of timeless beauty and understated luxury.
          </p>
          
          {/* Clean bullet points - optional minimal feature list */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="w-1 h-1 bg-amber-700 rounded-full" />
              <span>Handcrafted with precision</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-1 h-1 bg-amber-700 rounded-full" />
              <span>Ethically sourced materials</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-1 h-1 bg-amber-700 rounded-full" />
              <span>Timeless design</span>
            </div>
          </div>
          
          {/* Refined button */}
          <div className="pt-4">
            <button className="group relative px-0 py-2 text-sm tracking-[0.2em] uppercase 
                             text-amber-800 overflow-hidden transition-all duration-300">
              <span className="relative z-10">Discover Collection</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-amber-800 
                             transform origin-left transition-transform duration-300 
                             group-hover:scale-x-0" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-amber-300 
                             transform scale-x-0 origin-left transition-transform duration-300 
                             group-hover:scale-x-100" />
            </button>
          </div>

          {/* Minimalist divider with subtle sparkle */}
          <div className="flex items-center space-x-3 pt-2">
            <span className="w-8 h-px bg-amber-200" />
            <span className="text-amber-700/40 text-xs">✦</span>
            <span className="w-8 h-px bg-amber-200" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;