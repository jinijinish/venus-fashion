// CollectionsDropdown.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SubCategory {
  name: string;
  path: string;
}

interface Category {
  name: string;
  description?: string;
  subcategories: SubCategory[];
}

const CollectionsDropdown = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Earrings");

  const categories: Category[] = [
    {
      name: "Earrings",
      subcategories: [
        { name: "Stud Earrings", path: "/collections/earrings/stud" },
        { name: "Hoop Earrings", path: "/collections/earrings/hoop" },
        { name: "Drop Earrings", path: "/collections/earrings/drop" },
        { name: "Jhumka Earrings", path: "/collections/earrings/jhumka" },
        { name: "Chandbali Earrings", path: "/collections/earrings/chandbali" },
        { name: "Daily Wear Earrings", path: "/collections/earrings/daily-wear" },
        { name: "Party Wear Earrings", path: "/collections/earrings/party-wear" },
      ]
    },
    {
      name: "Necklaces",
      subcategories: [
        { name: "Short Necklaces", path: "/collections/necklaces/short" },
        { name: "Long Necklaces (Haram)", path: "/collections/necklaces/haram" },
        { name: "Bridal Necklace Sets", path: "/collections/necklaces/bridal" },
        { name: "Choker Necklaces", path: "/collections/necklaces/choker" },
        { name: "Pendant Necklaces", path: "/collections/necklaces/pendant" },
        { name: "Temple Jewellery Necklaces", path: "/collections/necklaces/temple" },
      ]
    },
    {
      name: "Traditional Jewellery",
      subcategories: [
        { name: "Temple Jewellery", path: "/collections/traditional/temple" },
        { name: "South Indian Bridal Sets", path: "/collections/traditional/south-indian-bridal" },
        { name: "Kundan Traditional Sets", path: "/collections/traditional/kundan-sets" },
        { name: "Antique Finish Jewellery", path: "/collections/traditional/antique" },
        { name: "Festival Collections", path: "/collections/traditional/festival" },
      ]
    },
    {
      name: "Bracelets",
      subcategories: [
        { name: "Chain Bracelets", path: "/collections/bracelets/chain" },
        { name: "Charm Bracelets", path: "/collections/bracelets/charm" },
        { name: "Kada (Traditional Bracelets)", path: "/collections/bracelets/kada" },
        { name: "Adjustable Bracelets", path: "/collections/bracelets/adjustable" },
        { name: "Daily Wear Bracelets", path: "/collections/bracelets/daily-wear" },
      ]
    },
    {
      name: "Anti-Tarnish Jewellery",
      description: "Long-lasting, no color fade",
      subcategories: [
        { name: "Anti-Tarnish Earrings", path: "/collections/anti-tarnish/earrings" },
        { name: "Anti-Tarnish Necklaces", path: "/collections/anti-tarnish/necklaces" },
        { name: "Anti-Tarnish Bracelets", path: "/collections/anti-tarnish/bracelets" },
        { name: "Waterproof Jewellery", path: "/collections/anti-tarnish/waterproof" },
        { name: "Office Wear Jewellery", path: "/collections/anti-tarnish/office-wear" },
      ]
    },
    {
      name: "Pearl Collections",
      subcategories: [
        { name: "Pearl Necklaces", path: "/collections/pearl/necklaces" },
        { name: "Pearl Earrings", path: "/collections/pearl/earrings" },
        { name: "Pearl Bracelets", path: "/collections/pearl/bracelets" },
        { name: "Freshwater Pearl Sets", path: "/collections/pearl/freshwater-sets" },
        { name: "Bridal Pearl Jewellery", path: "/collections/pearl/bridal" },
      ]
    },
    {
      name: "Rings",
      subcategories: [
        { name: "Adjustable Rings", path: "/collections/rings/adjustable" },
        { name: "Stone Rings", path: "/collections/rings/stone" },
        { name: "Engagement Rings", path: "/collections/rings/engagement" },
        { name: "Statement Rings", path: "/collections/rings/statement" },
        { name: "Daily Wear Rings", path: "/collections/rings/daily-wear" },
      ]
    },
    {
      name: "Kundan Collection",
      subcategories: [
        { name: "Kundan Necklace Sets", path: "/collections/kundan/necklace-sets" },
        { name: "Kundan Earrings", path: "/collections/kundan/earrings" },
        { name: "Kundan Maang Tikka", path: "/collections/kundan/maang-tikka" },
        { name: "Bridal Kundan Sets", path: "/collections/kundan/bridal-sets" },
        { name: "Kundan Bangles", path: "/collections/kundan/bangles" },
      ]
    },
    {
      name: "Antique Silver Jewellery",
      subcategories: [
        { name: "Antique Silver Necklaces", path: "/collections/antique-silver/necklaces" },
        { name: "Oxidized Silver Earrings", path: "/collections/antique-silver/oxidized-earrings" },
        { name: "Tribal Silver Jewellery", path: "/collections/antique-silver/tribal" },
        { name: "Vintage Silver Rings", path: "/collections/antique-silver/vintage-rings" },
        { name: "Ethnic Silver Sets", path: "/collections/antique-silver/ethnic-sets" },
      ]
    },
    {
      name: "Bold Collections",
      description: "Heavy / Statement Jewellery",
      subcategories: [
        { name: "Statement Necklaces", path: "/collections/bold/statement-necklaces" },
        { name: "Oversized Earrings", path: "/collections/bold/oversized-earrings" },
        { name: "Chunky Rings", path: "/collections/bold/chunky-rings" },
        { name: "Fashion Statement Sets", path: "/collections/bold/statement-sets" },
        { name: "Party Wear Bold Designs", path: "/collections/bold/party-wear" },
      ]
    },
    {
      name: "Pure Silver Collection",
      description: "92.5 Sterling Silver Jewellery",
      subcategories: [
        { name: "Silver Chains", path: "/collections/pure-silver/chains" },
        { name: "Silver Rings", path: "/collections/pure-silver/rings" },
        { name: "Silver Anklets", path: "/collections/pure-silver/anklets" },
        { name: "Silver Earrings", path: "/collections/pure-silver/earrings" },
        { name: "Kids Silver Jewellery", path: "/collections/pure-silver/kids" },
      ]
    },
    {
      name: "Accessories",
      subcategories: [
        { name: "Anklets (Payal)", path: "/collections/accessories/anklets" },
        { name: "Hair Accessories", path: "/collections/accessories/hair" },
        { name: "Nose Pins", path: "/collections/accessories/nose-pins" },
        { name: "Maang Tikka", path: "/collections/accessories/maang-tikka" },
        { name: "Waist Belt (Kamarbandh)", path: "/collections/accessories/kamarbandh" },
      ]
    }
  ];

  return (
    <div className="w-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100">
      <div className="flex">
        {/* Categories List */}
        <div className="w-1/3 bg-stone-50 p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-3 px-3">CATEGORIES</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onMouseEnter={() => setActiveCategory(category.name)}
                onClick={() => setActiveCategory(category.name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                  activeCategory === category.name
                    ? 'bg-amber-50 text-amber-800 font-medium'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span>{category.name}</span>
                {category.description && (
                  <span className="text-xs text-stone-400 italic hidden group-hover:inline">
                    {category.description}
                  </span>
                )}
                <ChevronRight 
                  size={16} 
                  className={`transition-all ${
                    activeCategory === category.name 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-2'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="w-2/3 p-5">
          {activeCategory ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-stone-800">{activeCategory}</h3>
                <Link 
                  href={`/collections/${activeCategory.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {categories
                  .find(c => c.name === activeCategory)
                  ?.subcategories.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className="text-sm text-stone-600 hover:text-amber-700 transition-colors py-1.5 px-2 rounded hover:bg-amber-50"
                    >
                      {sub.name}
                    </Link>
                  ))}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-stone-400 text-sm">
              Select a category to view subcategories
            </div>
          )}
        </div>
      </div>

      {/* Quick Links Footer */}
      <div className="border-t border-stone-100 p-3 bg-stone-50/50">
        <div className="flex justify-center gap-6 text-xs">
          <Link href="/collections/new-arrivals" className="text-stone-500 hover:text-amber-700">
            ✨ New Arrivals
          </Link>
          <Link href="/collections/best-sellers" className="text-stone-500 hover:text-amber-700">
            ⭐ Best Sellers
          </Link>
          <Link href="/collections/sale" className="text-amber-600 hover:text-amber-700 font-medium">
            🔥 Sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionsDropdown;