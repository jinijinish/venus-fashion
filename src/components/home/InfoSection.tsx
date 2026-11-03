"use client";

import React from 'react';
import { Truck, Gem, Package, Award } from 'lucide-react';

const features = [
  {
    icon: <Truck size={24} className="text-[#634832]" />,
    title: "Free Shipping",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    icon: <Gem size={24} className="text-[#634832]" />,
    title: "Exclusive Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    icon: <Package size={24} className="text-[#634832]" />,
    title: "Good Packaging",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    icon: <Award size={24} className="text-[#634832]" />,
    title: "Highest Quality",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const InfoSection = () => {
  return (
    <section className="bg-[#FAF3F0] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center text-center px-6 
              ${index !== features.length - 1 ? 'lg:border-r lg:border-gray-200' : ''}`}
          >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-full bg-[#E8D8CF] flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            
            {/* Text Content */}
            <h3 className="text-[#3A2D28] font-serif text-xl mb-2">
              {feature.title}
            </h3>
            <p className="text-[#7D6E66] text-sm leading-relaxed max-w-[200px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;