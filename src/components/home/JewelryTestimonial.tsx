"use client";

import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const JewelryTestimonial = () => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Testimonial Content */}
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium">
              Testimonial
            </span>
            
            <h2 className="text-4xl md:text-5xl text-stone-900 font-light leading-tight tracking-tight">
              Client stories
            </h2>
            
            <div className="space-y-6">
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                "The Diamond Solitaire necklace exceeded my expectations. 
                The brilliance of the stone and the precision of the setting 
                create something truly timeless."
              </p>
              
              <p className="text-stone-500 text-base italic font-light">
                — Madeline Claire —
              </p>
            </div>

            {/* Minimal Navigation */}
            <div className="flex gap-3 pt-4">
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center hover:border-stone-400 transition-colors">
                <ArrowLeft className="w-3 h-3 text-stone-400" />
              </button>
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center hover:border-stone-400 transition-colors">
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Right Side: Minimal Image Composition */}
          <div className="relative flex justify-center">
            {/* Main Image */}
            <div className="w-[90%] lg:w-[380px] h-[500px]">
              <img 
                src="/hand.jpg" 
                alt="Woman wearing jewelry" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Secondary Image - Clean overlap */}
            <div className="absolute top-1/2 -right-4 lg:-right-8 transform -translate-y-1/2 w-44 h-44 md:w-52 md:h-52 border-[6px] border-white shadow-lg">
              <img 
                src="/bg.jpg" 
                alt="Jewelry Detail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal bottom line accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-stone-100"></div>
    </section>
  );
};

export default JewelryTestimonial;