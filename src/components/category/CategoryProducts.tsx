// components/category/CategoryProducts.tsx
"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import FilterSidebar from '../layout/FilterSidebar';
import { Product } from '@/service/products';
import { useState, useEffect } from 'react';
import { Filter, Grid3x3, LayoutList, Star } from 'lucide-react';

interface CategoryProductsProps {
  products: Product[];
  categoryName: string;
}

export default function CategoryProducts({ products, categoryName }: CategoryProductsProps) {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Apply category filter (featured, new, best-seller)
    if (selectedCategories.length > 0) {
      result = result.filter(p => {
        if (selectedCategories.includes('Featured') && p.category === 'featured') return true;
        if (selectedCategories.includes('New') && p.category === 'new') return true;
        if (selectedCategories.includes('Best-Seller') && p.category === 'best-seller') return true;
        return false;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          if (a.dateAdded && b.dateAdded) {
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
          }
          return 0;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, priceRange, selectedBrands, selectedCategories, sortBy]);

  if (products.length === 0) {
    return <EmptyState onBrowseOther={() => router.push('/')} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Button - Visible only on mobile */}
      <div className="lg:hidden flex items-center justify-between mb-4 w-full">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg"
        >
          <Filter size={18} />
          <span>Filters</span>
          {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[1] < 10000) && (
            <span className="ml-1 w-5 h-5 bg-amber-400 text-white text-xs rounded-full flex items-center justify-center">
              {selectedBrands.length + selectedCategories.length}
            </span>
          )}
        </button>
        
        {/* Sort Dropdown for Mobile */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Filter Sidebar - Desktop (Left Side) */}
      <div className="hidden lg:block lg:w-80 flex-shrink-0">
        <FilterSidebar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* Filter Sidebar - Mobile Drawer */}
      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>
        </div>
      )}

      {/* Products Section (Right Side) */}
      <div className="flex-1">
        {/* Top Bar with Results Count and Sort - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{products.length}</span> products
          </p>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-amber-50 text-amber-600' 
                    : 'bg-white text-gray-400 hover:text-gray-600'
                }`}
                title="Grid view"
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-amber-50 text-amber-600' 
                    : 'bg-white text-gray-400 hover:text-gray-600'
                }`}
                title="List view"
              >
                <LayoutList size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-amber-400"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Mobile Results Count */}
        <div className="lg:hidden mb-4">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Products Display */}
        {filteredProducts.length > 0 ? (
          <div>
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group"
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group block"
                  >
                    <ProductListItem product={product} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No products match your filters.</p>
            <button
              onClick={() => {
                setPriceRange([0, 10000]);
                setSelectedBrands([]);
                setSelectedCategories([]);
              }}
              className="px-6 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// List View Component for better product display
function ProductListItem({ product }: { product: Product }) {
  return (
    <div className="flex bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-[#f5f0ea]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < product.rating ? 'text-gray-900 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <p className="text-amber-600 font-bold">₹{product.price}</p>
          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">₹{product.oldPrice}</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-2">
          {product.isNew && (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">New</span>
          )}
          {product.isBestSeller && (
            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded">Best Seller</span>
          )}
          {product.discount && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">{product.discount}</span>
          )}
        </div>
      </div>
    </div>
  );
}