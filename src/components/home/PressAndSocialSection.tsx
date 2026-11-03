"use client";

import React, { useState } from 'react';

const PressAndSocialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const logos = [
    { alt: "Better Homes & Gardens", label: "Better Homes\n& Gardens", style: "font-serif text-xs leading-tight tracking-tight font-bold text-gray-700 text-center whitespace-pre-line" },
    { alt: "RESERVED", label: "RESERVED", style: "font-sans text-sm tracking-[0.25em] font-semibold text-gray-700" },
    { alt: "fabfitfun", label: "fabfitfun", style: "font-serif italic text-lg font-bold text-gray-700" },
    { alt: "REVERLAND", label: "REVERLAND", style: "font-sans text-xs tracking-[0.3em] font-semibold text-gray-700 flex flex-col items-center gap-0.5" },
    { alt: "BULLHEAD", label: "BULLHEAD", style: "font-sans text-sm tracking-[0.2em] font-bold text-gray-700" },
  ];

  // Masonry-style grid: 1 large image (left, spans 2 rows) + 6 smaller images
  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', large: true },
    { id: 2, src: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80' },
    { id: 3, src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80' },
    { id: 4, src: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80' },
    { id: 5, src: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80' },
    { id: 6, src: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400&q=80' },
    { id: 7, src: 'https://images.unsplash.com/photo-1573408301185-9519f94bf1a6?w=400&q=80' },
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-4 md:px-10">

      {/* ── AS SEEN IN ── */}
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto mb-14">

        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <div className="relative">
            {/* Ghost background text */}
            <span
              className="absolute select-none pointer-events-none font-serif font-bold text-gray-200 whitespace-nowrap hidden md:block"
              style={{ fontSize: '5rem', top: '-1.6rem', left: '-0.5rem', zIndex: 0, opacity: 0.55 }}
            >
              As seen in
            </span>
            <h2
              className="relative font-serif text-4xl md:text-5xl text-gray-800"
              style={{ zIndex: 1 }}
            >
              As seen in
            </h2>
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
              className="w-9 h-9 border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex(i => i + 1)}
              className="w-9 h-9 bg-[#C8956A] flex items-center justify-center hover:bg-[#b5845b] transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Logo bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-80 transition-opacity duration-300">
          {/* Better Homes & Gardens */}
          <div className="flex flex-col items-center leading-tight">
            <span className="font-serif text-[10px] tracking-tight font-bold text-gray-800">Better Homes</span>
            <span className="font-serif text-[10px] tracking-tight font-bold text-gray-800">&amp; Gardens</span>
          </div>

          {/* RESERVED */}
          <span className="font-sans text-xs tracking-[0.3em] font-semibold text-gray-800 uppercase">
            Reserved
          </span>

          {/* fabfitfun */}
          <span className="font-serif italic text-lg font-bold text-gray-800">fabfitfun</span>

          {/* REVERLAND */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-sans text-[9px] tracking-[0.3em] text-gray-400 uppercase">✦ ✦</span>
            <span className="font-sans text-xs tracking-[0.25em] font-semibold text-gray-800 uppercase">Reverland</span>
          </div>

          {/* BULLHEAD */}
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🐂</span>
            <span className="font-sans text-xs tracking-[0.2em] font-bold text-gray-800 uppercase">Bullhead</span>
          </div>
        </div>
      </div>

      {/* ── INSTAGRAM GALLERY ── */}
      <div className="max-w-6xl mx-auto">
        {/*
          Layout: 4-column CSS grid
          - Image 1: col 1, spans 2 rows (tall portrait)
          - Images 2-7: cols 2-4, 2 rows of 3
        */}
        <div
          className="grid gap-1 md:gap-2"
          style={{
            gridTemplateColumns: '1.4fr repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 200px)',
          }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              className="relative overflow-hidden group bg-gray-200"
              style={img.large ? { gridRow: '1 / 3' } : {}}
            >
              <img
                src={img.src}
                alt="Jewelry"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Instagram hover overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                <svg className="w-7 h-7 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Us button */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#1A1A1A] text-white px-10 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors">
            Follow us @eurodiamond
          </button>
        </div>
      </div>
    </section>
  );
};

export default PressAndSocialSection;