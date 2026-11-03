"use client";

import React from 'react';

// Define the structure for your logo data
interface Logo {
  id: number;
  name: string;
  src: string; // Path to your logo images
}

const logos: Logo[] = [
  { id: 1, name: 'Stelliage', src: '/logos/stelliage.png' },
  { id: 2, name: 'White Label', src: '/logos/white-label.png' },
  { id: 3, name: 'QKE', src: '/logos/qke.png' },
  { id: 4, name: 'Roman Paul', src: '/logos/roman-paul.png' },
  { id: 5, name: 'KS', src: '/logos/ks.png' },
  { id: 6, name: 'Love', src: '/logos/love.png' },
];

const AddSection: React.FC = () => {
  return (
    <section className="w-full py-12 bg-[#FDF8F2] border-y border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {logos.map((logo) => (
            <div 
              key={logo.id} 
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              {/* Replace <img> with <Image /> if using Next.js */}
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddSection;