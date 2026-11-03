// app/components/TrendingSection.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { products, Product } from '@/service/products';

const ProductCard = ({ product }: { product: Product }) => {
  const [imgSrc, setImgSrc] = React.useState(product.image);
  
  const showNewBadge = product.isNew;
  const showBestSellerBadge = product.isBestSeller;
  
  // Format price with Indian Rupee symbol
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };
  
  return (
    <Link href={`/product/${String(product.id)}`} className="group flex flex-col items-start space-y-3 font-serif w-full">
      <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-4 sm:p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200">
        {/* Discount badge (if any) */}
        {product.discount && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black text-white text-[8px] sm:text-[10px] font-medium tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 z-10">
            {product.discount}
          </span>
        )}
        
        {/* New Arrival badge */}
        {showNewBadge && !product.discount && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white text-[8px] sm:text-[10px] font-medium tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 z-10">
            NEW
          </span>
        )}
        
        {/* Best Seller badge */}
        {showBestSellerBadge && !product.discount && !showNewBadge && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-600 text-white text-[8px] sm:text-[10px] font-medium tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 z-10">
            BEST SELLER
          </span>
        )}
        
        <img 
          src={imgSrc} 
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format')}
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2 w-full px-0.5">
        <p className="text-gray-400 text-[10px] sm:text-xs tracking-wider uppercase truncate">{product.brand}</p>
        <h3 className="text-gray-900 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 min-h-[32px] sm:min-h-[42px]">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={10} 
              className={`${i < product.rating ? "fill-black text-black" : "text-gray-200"} sm:w-[11px] sm:h-[11px]`} 
            />
          ))}
          <span className="text-gray-400 text-[10px] sm:text-xs ml-0.5 sm:ml-1">({product.reviews})</span>
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center gap-1 sm:gap-2">
          {product.oldPrice && (
            <span className="text-gray-300 text-[11px] sm:text-sm line-through order-2 xs:order-1">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-gray-900 font-medium text-xs sm:text-sm tracking-wide order-1 xs:order-2">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState('FEATURED');
  const tabs = ['FEATURED', 'NEW ARRIVALS', 'BEST SELLER'];

  // Filter products based on active tab
  const getFilteredProducts = () => {
    switch(activeTab) {
      case 'NEW ARRIVALS':
        return products.filter(p => p.category === 'new' || p.isNew);
      case 'BEST SELLER':
        return products.filter(p => p.category === 'best-seller' || p.isBestSeller);
      case 'FEATURED':
      default:
        return products.filter(p => p.category === 'featured');
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="w-full bg-[#FFF7E6]"> {/* Changed to warm yellow background */}
      <div className="max-w-[2000px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide">
            Trending Products
          </h2>
          
          <div className="flex justify-center space-x-4 sm:space-x-8 md:space-x-12 border-b border-gray-100 overflow-x-auto pb-1 px-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 sm:pb-3 text-[10px] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-300 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <Link 
            href={`/category/${activeTab === 'FEATURED' ? 'featured' : activeTab === 'NEW ARRIVALS' ? 'new' : 'best-seller'}`}
            className="inline-block border border-gray-900 text-gray-900 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            VIEW ALL {activeTab === 'FEATURED' ? 'FEATURED' : activeTab === 'NEW ARRIVALS' ? 'NEW ARRIVALS' : 'BEST SELLERS'}
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:items-center {
            align-items: center;
          }
          .xs\\:order-1 {
            order: 1;
          }
          .xs\\:order-2 {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}