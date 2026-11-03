// components/category/CategoryHeader.tsx
"use client";

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface CategoryHeaderProps {
  categoryName: string;
}

const CategoryHeader = ({ categoryName }: CategoryHeaderProps) => {
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-amber-600 transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
          {categoryName}
        </h1>
        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our exclusive collection of {categoryName.toLowerCase()}
        </p>
      </div>
    </>
  );
};

export default CategoryHeader; 