'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const brands = [
  'Belage Jewels',
  'Buccellati',
  'Bvlgari',
  'Cartier',
  'Chopard',
  'David Yurman',
];

const categories = [
  { label: 'Featured', value: 'featured' },
  { label: 'New', value: 'new' },
  { label: 'Best-Seller', value: 'best-seller' },
];

// Collapsible section wrapper
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-xs font-semibold tracking-widest text-gray-700 uppercase">
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-gray-400" />
        ) : (
          <ChevronDown size={14} className="text-gray-400" />
        )}
      </button>

      {/* 
        KEY FIX: No max-h, no overflow-y-auto, no overflow-y-scroll
        Content expands naturally — zero scroll inside sections
      */}
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
}: FilterSidebarProps) {

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const toggleCategory = (value: string) => {
    setSelectedCategories(
      selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([priceRange[0], Number(e.target.value)]);
  };

  return (
    /*
      OUTER WRAPPER FIX:
      - No overflow-hidden, no max-h, no overflow-y-auto here
      - Just a plain div that grows with content
    */
    <div className="w-full">

      {/* Price Filter */}
      <FilterSection title="Price">
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full accent-gray-800 cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-400">₹0</span>
            <span className="text-[10px] text-gray-600 font-medium">
              Up to ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection title="Brand">
        {/* 
          NO max-h / overflow here — list always fully visible 
        */}
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="w-3.5 h-3.5 accent-gray-800 cursor-pointer flex-shrink-0"
            />
            <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
              {brand}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Category Filter */}
      <FilterSection title="Category">
        {/* 
          NO max-h / overflow here — all categories always visible 
        */}
        {categories.map((cat) => (
          <label
            key={cat.value}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.value)}
              onChange={() => toggleCategory(cat.value)}
              className="w-3.5 h-3.5 accent-gray-800 cursor-pointer flex-shrink-0"
            />
            <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
              {cat.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Reset All */}
      {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[1] < 10000) && (
        <button
          onClick={() => {
            setSelectedBrands([]);
            setSelectedCategories([]);
            setPriceRange([0, 10000]);
          }}
          className="w-full mt-2 text-[10px] tracking-widest text-gray-400 hover:text-gray-700 uppercase transition-colors text-left"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}