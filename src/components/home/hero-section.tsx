"use client";

import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import Header from '../layout/header';

// Add this to your global CSS or _document.js / layout.tsx:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

const HeroSection = () => {
  return (
    <>
      {/* Luxury Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

        .luxury-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.02em;
          line-height: 1.0;
        }

        .luxury-title span.word-luxury {
          font-weight: 600;
          font-style: normal;
          letter-spacing: 0.08em;
        }

        .luxury-title span.word-collections {
          font-weight: 300;
          font-style: italic;
        }
      `}</style>

      <section className="relative min-h-screen pt-20 sm:pt-20 w-full bg-[#8b6b4d] flex items-center justify-center p-4 overflow-hidden">
        {/* Main Model Background Image */}
        <div className="absolute inset-0">
          <img
            src="/jwl.webp"
            alt="Model"
            className="w-full h-full object-cover object-[75%] md:object-center opacity-90"
          />
        </div>

        {/* Header positioned absolutely on the hero section */}
        <Header />

        {/* Large Frosted Glass Container */}
        <div className="relative z-10 w-full max-w-[190vh] aspect-auto md:aspect-[21/9] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] md:rounded-[50px] overflow-hidden flex flex-col md:flex-row">

          {/* Logo (Top Left) */}
          <div className="absolute top-6 left-6 md:top-10 md:left-12 flex items-center gap-2 z-20">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-stone-800 text-base md:text-lg">✦</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-medium text-white tracking-tight">VENUS</span>
          </div>

          {/* Left Content Section */}
          <div className="flex-1 p-6 md:p-16 flex flex-col min-h-[80vh] md:min-h-0">
            <div className="flex flex-col h-full justify-center mt-16 md:mt-12">
              {/* Main Typography */}
              <div className="max-w-xl">

                {/* ✦ UPDATED: Luxury Font Title */}
                <h1 className="luxury-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-10">
                  Our{' '}
                  <span className="word-luxury">Luxury</span>
                  <br />
                  <span className="word-collections">Collections</span>
                </h1>

                <div className="flex items-center gap-3 mb-8 md:mb-12">
                  <button className="bg-white text-stone-800 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-xs md:text-sm hover:shadow-lg transition-all whitespace-nowrap">
                    Let's Get Started
                  </button>
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-stone-800 cursor-pointer hover:scale-105 transition-transform">
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                  </div>
                </div>

                {/* Greeting Message - Visible on mobile only */}
                <div className="block md:hidden mb-8">
                  <p className="font-serif text-2xl text-white/90 italic mb-2">
                    "Where elegance meets eternity"
                  </p>
                  <p className="text-white/80 text-sm font-light tracking-wide">
                    Discover timeless pieces crafted for your cherished moments
                  </p>
                </div>

                {/* Hidden on mobile - only shown on md screens and up */}
                <div className="hidden md:block space-y-3">
                  <p className="text-white/90 text-[10px] md:text-xs font-bold tracking-[0.2em] flex items-center gap-2">
                    <span className="h-[1px] w-4 bg-white/60"></span>
                    VENUS JEWELRY STORE
                  </p>
                  <p className="text-white/80 text-xs md:text-[13px] leading-relaxed max-w-sm pr-4 md:pr-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Field - Hidden on mobile */}
          <div className="hidden md:block w-[50%] pt-25 sm:pt-25 relative overflow-hidden">
            <img
              src="/fg.png"
              alt="Luxury Jewelry Collection"
              className="w-110 h-110 object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;