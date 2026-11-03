"use client";

import React from 'react';
import Link from 'next/link';

interface SubcategoriesGridProps {
  category: string;
}

const subcategoriesByCategory: Record<string, Array<{ name: string; slug: string }>> = {
  earrings: [
    { name: 'Stud Earrings', slug: 'stud' },
    { name: 'Hoop Earrings', slug: 'hoop' },
    { name: 'Drop Earrings', slug: 'drop' },
    { name: 'Jhumka Earrings', slug: 'jhumka' },
    { name: 'Chandbali Earrings', slug: 'chandbali' },
    { name: 'Daily Wear', slug: 'daily-wear' },
    { name: 'Party Wear', slug: 'party-wear' },
  ],
  necklaces: [
    { name: 'Short Necklaces', slug: 'short' },
    { name: 'Long Necklaces', slug: 'haram' },
    { name: 'Bridal Sets', slug: 'bridal' },
    { name: 'Choker', slug: 'choker' },
    { name: 'Pendant', slug: 'pendant' },
    { name: 'Temple', slug: 'temple' },
  ],
  rings: [
    { name: 'Adjustable Rings', slug: 'adjustable' },
    { name: 'Stone Rings', slug: 'stone' },
    { name: 'Engagement Rings', slug: 'engagement' },
    { name: 'Statement Rings', slug: 'statement' },
    { name: 'Daily Wear', slug: 'daily-wear' },
  ],
  bracelets: [
    { name: 'Chain Bracelets', slug: 'chain' },
    { name: 'Charm Bracelets', slug: 'charm' },
    { name: 'Kada', slug: 'kada' },
    { name: 'Adjustable', slug: 'adjustable' },
    { name: 'Daily Wear', slug: 'daily-wear' },
  ]
};

export default function SubcategoriesGrid({ category }: SubcategoriesGridProps) {
  const subcategories = subcategoriesByCategory[category] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-sm font-light text-gray-900 mb-6 tracking-wider">SUBCATEGORIES</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategories.map((sub) => (
          <Link
            key={sub.slug}
            href={`/collections/${category}/${sub.slug}`}
            className="group block"
          >
            <div className="aspect-square bg-[#f5f0ea] mb-3 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-sm text-center text-gray-600 group-hover:text-gray-900 transition-colors">
              {sub.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}