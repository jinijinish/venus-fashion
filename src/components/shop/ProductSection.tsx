"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import FilterSidebar from '../layout/FilterSidebar';
import RelatedProducts from '../layout/RelatedProducts';
import { products as serviceProducts } from '@/service/products';

const ProductCard = ({ product }: { product: typeof serviceProducts[0] }) => (
  <Link href={`/product/${product.id}`} className="block group">
    <div className="flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-gray-200/50 p-3 rounded-lg">
      <div className="relative w-full aspect-square bg-[#FAFAFA] mb-3 overflow-hidden rounded-lg">
        {product.discount && (
          <span className="absolute top-3 left-3 text-[10px] tracking-wider text-gray-400 bg-white/80 px-2 py-0.5 z-10 rounded">
            {product.discount}
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 border border-transparent group-hover:border-gray-200 transition-colors duration-300 pointer-events-none rounded-lg"></div>
      </div>
      
      <h3 className="text-xs tracking-wide text-gray-600 mb-1 px-1 line-clamp-2 min-h-[32px]">{product.name}</h3>
      <div className="flex flex-wrap gap-2 items-center px-1">
        <span className="text-xs text-gray-900">₹{product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="text-[10px] text-gray-400 line-through">
            ₹{product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>
      {product.rating && (
        <div className="flex items-center gap-1 px-1 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-black' 
                    : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {product.reviewCount && (
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          )}
        </div>
      )}
    </div>
  </Link>
);

export default function ProductSection() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter products based on selected filters
  const filteredProducts = serviceProducts.filter(product => {
    const matchesPrice = product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
    const matchesCategory = selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category));
    
    return matchesPrice && matchesBrand && matchesCategory;
  });

  // Get related products (first 3 filtered products)
  const relatedProducts = filteredProducts.slice(0, 3);

  return (
    <section className="w-full bg-white pt-10">
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="flex justify-between items-end mb-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-1">
              Our Products
            </h2>
            <p className="text-[10px] text-gray-400 tracking-wider">
              1–{filteredProducts.length} OF {serviceProducts.length} RESULTS
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2 border-l border-gray-200 pl-4">
              <button className="w-3 h-3 border border-gray-400 hover:border-gray-900 transition-colors"></button>
              <button className="w-3 h-3 border border-gray-300 hover:border-gray-900 transition-colors"></button>
            </div>
          </div>
        </div>

        {/* Main content with sidebar - using grid for better control */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Sticky on large screens */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              
              {/* Related Products in Sidebar */}
              <RelatedProducts 
                products={relatedProducts}
                title="You might also like"
                variant="sidebar"
              />
            </div>
          </div>

          {/* Right side - Products container - FIXED: Removed scrollable area */}
          <div className="lg:col-span-3">
            {/* REMOVED: h-[800px] overflow-y-auto - Now products flow naturally without scroll */}
            <div className="pr-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}