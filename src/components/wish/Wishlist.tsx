"use client";

import React, { useEffect } from 'react';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Debug: Log wishlist items whenever they change
  useEffect(() => {
    console.log('Wishlist items updated:', wishlistItems);
  }, [wishlistItems]);

  const moveToCart = (item: any) => {
    console.log('Moving to cart:', item);
    
    // Add to cart
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    
    // Remove from wishlist
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen p-6 md:p-12" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-[90%] lg:max-w-90% mx-auto pt-20">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light mb-1" style={{ color: '#2C2C2C' }}>Wishlist</h1>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>{wishlistItems.length} items</p>
          </div>
          <Link 
            href="/shop" 
            className="flex items-center gap-2 text-sm font-light hover:opacity-70 transition-all"
            style={{ color: '#2C2C2C' }}
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </header>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                style={{ backgroundColor: '#FDF8F4' }} // Pastel light brown color
              >
                {/* Image Section */}
                <Link href={`/product/${item.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>
                </Link>
                
                {/* Remove Button */}
                <button 
                  onClick={() => {
                    console.log('Removing item:', item.id);
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  style={{ color: '#8A8A8A' }}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>

                {/* Content Section */}
                <div className="p-3">
                  {item.brand && (
                    <span className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: '#B4A39A' }}>
                      {item.brand}
                    </span>
                  )}
                  <h3 className="text-xs font-light line-clamp-1 mb-1" style={{ color: '#2C2C2C' }}>
                    {item.name}
                  </h3>
                  <p className="text-xs font-medium mb-2" style={{ color: '#2C2C2C' }}>
                    ₹{item.price.toFixed(2)}
                  </p>

                  {/* Cart Button - Always Visible */}
                  <button 
                    onClick={() => moveToCart(item)}
                    className="w-full text-xs flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all duration-300 hover:shadow-sm"
                    style={{ 
                      backgroundColor: '#2C2C2C',
                      color: '#FFFFFF'
                    }}
                  >
                    <ShoppingCart size={12} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FDF8F4' }}>
              <Heart size={24} style={{ color: '#B4A39A' }} />
            </div>
            <h2 className="text-lg font-light" style={{ color: '#2C2C2C' }}>Your wishlist is empty</h2>
            <p className="text-sm mt-1 mb-5" style={{ color: '#8A8A8A' }}>Save your favorite items here</p>
            <Link 
              href="/shop"
              className="px-5 py-2 text-sm transition-colors"
              style={{ 
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                borderRadius: '0.375rem'
              }}
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;