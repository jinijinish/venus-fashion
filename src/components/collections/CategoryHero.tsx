"use client";

import React from 'react';

interface CategoryHeroProps {
  category: string;
}

const categoryDisplayNames: Record<string, string> = {
  'earrings': 'Earrings',
  'necklaces': 'Necklaces',
  'rings': 'Rings',
  'bracelets': 'Bracelets',
  'traditional-jewellery': 'Traditional Jewellery',
  'anti-tarnish-jewellery': 'Anti-Tarnish Jewellery',
  'pearl-collections': 'Pearl Collections',
  'kundan-collection': 'Kundan Collection',
  'antique-silver-jewellery': 'Antique Silver Jewellery',
  'bold-collections': 'Bold Collections',
  'pure-silver-collection': 'Pure Silver Collection',
  'accessories': 'Accessories'
};

export default function CategoryHero({ category }: CategoryHeroProps) {
  const categoryName = categoryDisplayNames[category] || category.replace(/-/g, ' ');
  
  return (
    <div className="bg-[#f5f0ea] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
          {categoryName}
        </h1>
        <p className="text-sm text-gray-500">
          Browse our collection of {categoryName.toLowerCase()}
        </p>
      </div>
    </div>
  );
}