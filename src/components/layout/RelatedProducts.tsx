'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/service/products';
import { Star } from 'lucide-react';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  variant?: 'sidebar' | 'grid';
}

export default function RelatedProducts({ 
  products, 
  title = "Related Products",
  variant = 'sidebar' 
}: RelatedProductsProps) {
  
  if (!products || products.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  if (variant === 'grid') {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-6">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group">
              <div className="space-y-2">
                <div className="relative aspect-square overflow-hidden bg-[#f5f0ea] rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {item.discount && (
                    <span className="absolute top-2 left-2 bg-amber-700 text-white text-xs px-2 py-1">
                      {item.discount}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase truncate">{item.brand}</p>
                  <h4 className="text-sm text-gray-900 line-clamp-2 group-hover:text-amber-700">
                    {item.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < item.rating ? 'fill-amber-700 text-amber-700' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Sidebar variant
  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-3 pb-2 border-b border-gray-100">
        {title}
      </h3>

      {/*
        KEY FIX:
        - No max-h, no overflow-y-auto → zero scroll
        - flex flex-col stacks cards naturally to full height
      */}
      <div className="flex flex-col gap-3">
        {products.map((item) => (
          <Link 
            key={item.id} 
            href={`/product/${item.id}`} 
            className="flex space-x-3 group hover:bg-gray-50 rounded-lg p-1.5 transition-colors duration-200"
          >
            <div className="relative w-16 h-16 bg-[#f5f0ea] rounded overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-gray-400 uppercase truncate tracking-widest">{item.brand}</p>
              <h4 className="text-xs text-gray-700 line-clamp-2 group-hover:text-amber-700 leading-snug mt-0.5">
                {item.name}
              </h4>
              <div className="flex items-center space-x-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={8}
                    className={i < item.rating ? 'fill-amber-700 text-amber-700' : 'text-gray-200'}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs font-medium text-gray-900">
                  {formatPrice(item.price)}
                </span>
                {item.oldPrice && (
                  <span className="text-[10px] text-gray-400 line-through">
                    {formatPrice(item.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link 
        href="/shop" 
        className="block text-center mt-4 text-xs text-amber-700 hover:text-amber-800 hover:underline tracking-wide"
      >
        View all products →
      </Link>
    </div>
  );
}