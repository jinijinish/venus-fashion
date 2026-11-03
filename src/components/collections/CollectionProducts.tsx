"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/service/products';
import { ChevronRight, X } from 'lucide-react';
import FilterSidebar from '../layout/FilterSidebar';
import RelatedProducts from '../layout/RelatedProducts';

interface CollectionProductsProps {
  category: string;
  subcategory?: string;
}

// Top-level category keywords — matches against product name/description
// because product.category values are 'featured' | 'new' | 'best-seller'
const topLevelCategoryKeywords: Record<string, string[]> = {
  'earrings':               ['earring', 'earrings', 'hoop', 'stud', 'drop', 'jhumka', 'chandbali'],
  'rings':                  ['ring', 'rings', 'solitaire', 'band', 'eternity'],
  'necklaces':              ['necklace', 'necklaces', 'pendant', 'haram', 'choker', 'chain', 'pearl necklace'],
  'bracelets':              ['bracelet', 'bracelets', 'bangle', 'kada', 'tennis bracelet'],
  'pendant':                ['pendant', 'locket'],
  'charm-bangles':          ['charm', 'bangle', 'bangles'],
  'anklets':                ['anklet', 'anklets', 'payal'],
  'brooches':               ['brooch', 'brooches', 'pin'],
  'cufflinks':              ['cufflink', 'cufflinks'],
  'hair-jewelry':           ['hair', 'maang tikka', 'hairpin'],
  'toe-rings':              ['toe ring', 'toe rings', 'bichiya'],
  'watch-charms':           ['watch', 'charm'],
  'traditional-jewellery':  ['traditional', 'temple', 'antique', 'kundan', 'meenakari'],
  'kundan-collection':      ['kundan', 'polki'],
  'pearl-collections':      ['pearl', 'pearls', 'south sea'],
  'antique-silver-jewellery': ['antique', 'silver', 'oxidised'],
};

// Subcategory keyword mapping for filtering products
const categoryKeywords: Record<string, Record<string, string[]>> = {
  earrings: {
    stud: ['stud', 'diamond stud', 'gold stud'],
    hoop: ['hoop', 'hoops'],
    drop: ['drop', 'chandelier'],
    jhumka: ['jhumka', 'jhumki'],
    chandbali: ['chandbali', 'chandbalis'],
    'daily-wear': ['daily', 'everyday', 'simple'],
    'party-wear': ['party', 'chandelier', 'statement']
  },
  necklaces: {
    short: ['short', 'choker'],
    haram: ['long', 'haram', 'necklace set'],
    bridal: ['bridal', 'wedding'],
    choker: ['choker'],
    pendant: ['pendant'],
    temple: ['temple', 'traditional']
  },
  rings: {
    adjustable: ['adjustable', 'open'],
    stone: ['stone', 'gemstone', 'crystal'],
    engagement: ['engagement', 'solitaire'],
    statement: ['statement', 'bold', 'chunky'],
    'daily-wear': ['daily', 'everyday', 'simple']
  },
  bracelets: {
    chain: ['chain', 'link'],
    charm: ['charm', 'pendant'],
    kada: ['kada', 'bangle'],
    adjustable: ['adjustable', 'elastic'],
    'daily-wear': ['daily', 'everyday', 'simple']
  }
};

const categoryDisplayNames: Record<string, string> = {
  'earrings': 'Earrings',
  'necklaces': 'Necklaces',
  'rings': 'Rings',
  'bracelets': 'Bracelets',
  'traditional-jewellery': 'Traditional Jewellery',
  'anti-tarnish-jewellery': 'Anti-Tarnish Jewellery',
  'pearl-collections': 'Pearl Collections',
  'kundan-collection': 'Kundan Collection',
  'antique-silver-jewellery': 'Antique Silver Jewellery',
  'bold-collections': 'Bold Collections',
  'pure-silver-collection': 'Pure Silver Collection',
  'accessories': 'Accessories'
};

const subcategoryDisplayNames: Record<string, string> = {
  'stud': 'Stud Earrings',
  'hoop': 'Hoop Earrings',
  'drop': 'Drop Earrings',
  'jhumka': 'Jhumka Earrings',
  'chandbali': 'Chandbali Earrings',
  'daily-wear': 'Daily Wear',
  'party-wear': 'Party Wear',
  'short': 'Short Necklaces',
  'haram': 'Long Necklaces',
  'bridal': 'Bridal Sets',
  'choker': 'Choker Necklaces',
  'pendant': 'Pendant Necklaces',
  'temple': 'Temple Jewellery',
  'adjustable': 'Adjustable',
  'stone': 'Stone Rings',
  'engagement': 'Engagement Rings',
  'statement': 'Statement Rings',
  'chain': 'Chain Bracelets',
  'charm': 'Charm Bracelets',
  'kada': 'Kada Bracelets'
};

// Product Card Component
const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/product/${product.id}`} className="block group">
    <div className="flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-gray-200/50 p-3 rounded-lg">
      <div className="relative w-full aspect-square bg-[#FAFAFA] mb-3 overflow-hidden rounded-lg">
        {product.discount && (
          <span className="absolute top-3 left-3 text-[10px] tracking-wider text-gray-400 bg-white/80 px-2 py-0.5 z-10 rounded">
            {product.discount}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 text-[10px] tracking-wider text-gray-400 bg-white/80 px-2 py-0.5 z-10 rounded">
            NEW
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
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

export default function CollectionProducts({ category, subcategory }: CollectionProductsProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevCategory, setPrevCategory] = useState(category);
  const [prevSubcategory, setPrevSubcategory] = useState<string | undefined>(subcategory);

  // Handle category changes smoothly
  useEffect(() => {
    if (category !== prevCategory || subcategory !== prevSubcategory) {
      setIsTransitioning(true);
      
      // Reset filters when category changes
      setSortBy('featured');
      setPriceRange([0, 10000]);
      setSelectedBrands([]);
      setSelectedCategories([]);
      
      // Update previous values
      setPrevCategory(category);
      setPrevSubcategory(subcategory);
      
      // Short timeout for smooth transition
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [category, subcategory, prevCategory, prevSubcategory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products based on category and subcategory
  const filteredProducts = useMemo(() => {
    // No subcategory → filter by top-level category keywords against product name
    if (!subcategory) {
      const topKeywords = topLevelCategoryKeywords[category] || [];
      let filtered = [...products];

      // If we have keywords for this category, filter by product name/description
      if (topKeywords.length > 0) {
        const matched = filtered.filter(p => {
          const name = p.name?.toLowerCase() || '';
          const desc = p.description?.toLowerCase() || '';
          return topKeywords.some(kw => name.includes(kw) || desc.includes(kw));
        });
        // Only apply keyword filter if it actually returns results
        if (matched.length > 0) filtered = matched;
      }

      if (selectedBrands.length > 0)
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
      if (selectedCategories.length > 0)
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      return filtered;
    }

    const keywords = categoryKeywords[category]?.[subcategory] || [];
    let filtered = [...products];

    // Apply keyword filtering
    if (keywords.length > 0) {
      filtered = filtered.filter(product => {
        const productName = product.name?.toLowerCase() || '';
        const productDesc = product.description?.toLowerCase() || '';
        const productCategory = product.category?.toLowerCase() || '';
        return keywords.some(keyword =>
          productName.includes(keyword.toLowerCase()) ||
          productDesc.includes(keyword.toLowerCase()) ||
          productCategory.includes(keyword.toLowerCase())
        );
      });
    } else {
      // Fallback: filter by category name match
      filtered = filtered.filter(product => {
        const productCategory = product.category?.toLowerCase() || '';
        const productName = product.name?.toLowerCase() || '';
        return productCategory.includes(category.toLowerCase()) ||
               productName.includes(category.toLowerCase());
      });
      // If still nothing matches, show ALL products rather than empty
      if (filtered.length === 0) filtered = [...products];
    }

    // Apply brand filter
    if (selectedBrands.length > 0)
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));

    // Apply category filter (sidebar checkboxes)
    if (selectedCategories.length > 0)
      filtered = filtered.filter(product => selectedCategories.includes(product.category));

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return filtered;
  }, [category, subcategory, selectedBrands, selectedCategories, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsToSort.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return productsToSort.sort((a, b) => b.rating - a.rating);
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortBy]);

  // Get related products (same category, not in current list)
  const relatedProducts = useMemo(() => {
    return products
      .filter(p => {
        const productCategory = p.category?.toLowerCase() || '';
        const productName = p.name?.toLowerCase() || '';
        const isSameCategory = productCategory.includes(category.toLowerCase()) ||
                               productName.includes(category.toLowerCase());
        const isNotCurrent = !filteredProducts.some(fp => fp.id === p.id);
        return isSameCategory && isNotCurrent;
      })
      .slice(0, 3);
  }, [category, filteredProducts]);

  const categoryName = categoryDisplayNames[category] || category?.replace(/-/g, ' ') || '';
  const subcategoryName = subcategory ? (subcategoryDisplayNames[subcategory] || subcategory.replace(/-/g, ' ')) : '';

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full bg-white pt-10">
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/collections" className="hover:text-gray-600 transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <Link href={`/collections/${category}`} className="hover:text-gray-600 transition-colors capitalize">
            {categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">{subcategoryName}</span>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-end mb-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-1">
              {subcategoryName}
            </h2>
            <p className="text-[10px] text-gray-400 tracking-wider">
              {isTransitioning ? 'UPDATING...' : `1–${sortedProducts.length} OF ${products.length} RESULTS`}
            </p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-transparent border border-gray-200 px-3 py-2 rounded focus:outline-none focus:border-gray-400 text-gray-600"
              disabled={isTransitioning}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {!isTransitioning && (selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[1] < 10000) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedBrands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}
                className="flex items-center space-x-1 bg-gray-100 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
              >
                <span>{brand}</span>
                <X size={12} />
              </button>
            ))}
            {selectedCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                className="flex items-center space-x-1 bg-gray-100 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
              >
                <span className="capitalize">{cat}</span>
                <X size={12} />
              </button>
            ))}
            {priceRange[1] < 10000 && (
              <button
                onClick={() => setPriceRange([0, 10000])}
                className="flex items-center space-x-1 bg-gray-100 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
              >
                <span>Under ₹{priceRange[1]}</span>
                <X size={12} />
              </button>
            )}
          </div>
        )}

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
              {!isTransitioning && relatedProducts.length > 0 && (
                <RelatedProducts 
                  products={relatedProducts}
                  title="You might also like"
                  variant="sidebar"
                />
              )}
            </div>
          </div>

          {/* Right side - Products container - FIXED: Removed scrollable area */}
          <div className="lg:col-span-3">
            {/* REMOVED: h-[800px] overflow-y-auto - Now products flow naturally without scroll */}
            <div className="pr-4">
              {isTransitioning ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-sm text-gray-400">Loading collection...</p>
                  </div>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg">
                  <p className="text-gray-400 mb-4">No products found in this collection.</p>
                  <Link 
                    href="/shop"
                    className="inline-block bg-gray-900 text-white px-6 py-3 text-xs tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    BROWSE ALL PRODUCTS
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 transition-opacity duration-300">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}