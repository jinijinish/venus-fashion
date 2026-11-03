"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/service/products';

export default function CategoriesGrid() {
  const categories = [
    { name: 'Earrings', slug: 'earrings', count: products.filter(p => p.name.toLowerCase().includes('earring')).length, image: products.find(p => p.name.toLowerCase().includes('earring'))?.image },
    { name: 'Necklaces', slug: 'necklaces', count: products.filter(p => p.name.toLowerCase().includes('necklace')).length, image: products.find(p => p.name.toLowerCase().includes('necklace'))?.image },
    { name: 'Rings', slug: 'rings', count: products.filter(p => p.name.toLowerCase().includes('ring')).length, image: products.find(p => p.name.toLowerCase().includes('ring'))?.image },
    { name: 'Bracelets', slug: 'bracelets', count: products.filter(p => p.name.toLowerCase().includes('bracelet')).length, image: products.find(p => p.name.toLowerCase().includes('bracelet'))?.image },
    { name: 'Traditional', slug: 'traditional-jewellery', count: 15, image: products[2]?.image },
    { name: 'Kundan', slug: 'kundan-collection', count: 12, image: products[3]?.image },
    { name: 'Pearl', slug: 'pearl-collections', count: 8, image: products[9]?.image },
    { name: 'Antique', slug: 'antique-silver-jewellery', count: 10, image: products[5]?.image },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/collections/${category.slug}`}
            className="group relative block overflow-hidden bg-[#f5f0ea] aspect-square"
          >
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-xl font-light mb-1">{category.name}</h2>
              <p className="text-xs opacity-90">{category.count} Products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}