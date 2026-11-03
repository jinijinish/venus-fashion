// app/category/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import FooterSection from '@/components/layout/FooterSection';
import { useEffect, useState } from 'react';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryProducts from '@/components/category/CategoryProducts';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import { getProductsByCategory, getCategoryName } from '@/data/categoryData'; 

export default function CategoryPage() {
  const params = useParams();
  const categoryId = parseInt(params.id as string);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProducts(getProductsByCategory(categoryId));
      setLoading(false);
    }, 500);
  }, [categoryId]);

  const categoryName = getCategoryName(categoryId);

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner />
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-25 bg-gradient-to-b from-[#f9f7f4] to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CategoryHeader categoryName={categoryName} />
          <CategoryProducts 
            products={products} 
            categoryName={categoryName}
          />
        </div>
      </div>
      <FooterSection />
    </>
  );
}