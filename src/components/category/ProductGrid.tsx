// components/category/ProductGrid.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/service/products';
import { Star, Heart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Product Image */}
              <div className="sm:w-48 h-48 bg-[#f5f0ea] relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">{product.brand}</p>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < product.rating ? 'fill-amber-700 text-amber-700' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                    </div>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Heart size={18} className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-light text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                        <span className="text-xs text-green-600">
                          Save {formatPrice(product.oldPrice - product.price)}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-amber-700 hover:text-amber-800">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Grid View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group block bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-[#f5f0ea] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {product.discount && (
              <span className="absolute top-2 left-2 bg-amber-700 text-white text-xs px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            <button className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart size={16} className="text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">{product.brand}</p>
            <h3 className="text-sm text-gray-900 line-clamp-2 group-hover:text-amber-700 transition-colors mb-2">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < product.rating ? 'fill-amber-700 text-amber-700' : 'text-gray-200'}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-base font-medium text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}