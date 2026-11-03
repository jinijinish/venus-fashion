// context/CategoryContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface CategoryContextType {
  getProductsByCategory: (categoryId: number) => Promise<Product[]>;
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/categories/${categoryId}/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ getProductsByCategory, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}