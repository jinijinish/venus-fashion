'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import FooterSection from '@/components/layout/FooterSection';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star, ChevronRight, Truck, RotateCcw, Shield,
  Clock, Heart, Share2, Minus, Plus
} from 'lucide-react';
import { Product, products } from '@/service/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/login/LoginModal';
import RelatedProducts from '@/components/layout/RelatedProducts';

interface ProductDetailClientProps {
  product: Product;
}

// Category list for sidebar
const sidebarCategories = [
  { name: 'Earrings', slug: 'earrings' },
  { name: 'Necklaces', slug: 'necklaces' },
  { name: 'Rings', slug: 'rings' },
  { name: 'Bracelets', slug: 'bracelets' },
  { name: 'Traditional', slug: 'traditional-jewellery' },
  { name: 'Kundan', slug: 'kundan-collection' },
  { name: 'Pearl', slug: 'pearl-collections' },
  { name: 'Antique', slug: 'antique-silver-jewellery' },
];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'cart' | 'buy' | null>(null);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get similar/related products (same category, different product)
  const similarProducts = products
    .filter(p =>
      p.id !== product.id &&
      p.category === product.category &&
      Math.abs(p.price - product.price) < 1000
    )
    .slice(0, 4);

  // Related products for sidebar (same category)
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">Loading...</div>;
  }

  const productImages = product.images?.length ? product.images : [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setPendingAction('cart');
      setShowLoginModal(true);
      return;
    }
    performAddToCart();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setPendingAction('buy');
      setShowLoginModal(true);
      return;
    }
    performBuyNow();
  };

  const performAddToCart = () => {
    setIsAddingToCart(true);
    setShowSuccessMessage(false);
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    };
    addToCart(newItem);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowSuccessMessage(false);
    }, 1500);
  };

  const performBuyNow = () => {
    performAddToCart();
    setTimeout(() => router.push('/cart'), 100);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingAction === 'cart') performAddToCart();
    else if (pendingAction === 'buy') performBuyNow();
    setPendingAction(null);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setPendingAction(null);
  };

  const handleWishlistToggle = () => {
    setIsWishlistAnimating(true);
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand || '',
        category: product.category || '',
      });
    }
    setTimeout(() => setIsWishlistAnimating(false), 500);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviews})` },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Header />

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
        message={
          pendingAction === 'buy'
            ? 'Please login to complete your purchase'
            : 'Please login to add items to your cart'
        }
      />

      {/* Breadcrumb */}
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate">{product.name}</span>
        </nav>
      </div>

      {/* ── Main 2-column layout: Sidebar LEFT · Product RIGHT ── */}
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">Categories</h3>
                <ul className="space-y-1">
                  {sidebarCategories.map((cat) => {
                    const isActive =
                      product.category?.toLowerCase().includes(cat.slug.replace(/-/g, ' ')) ||
                      cat.slug === product.category?.toLowerCase();
                    return (
                      <li key={cat.slug}>
                        <Link
                          href={`/collections/${cat.slug}`}
                          className={`flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                            isActive
                              ? 'bg-amber-50 text-amber-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight size={12} className="opacity-40" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Related Products in sidebar */}
              {relatedProducts.length > 0 && (
                <RelatedProducts
                  products={relatedProducts}
                  title="Related Products"
                  variant="sidebar"
                />
              )}
            </div>
          </aside>

          {/* ── RIGHT: Product Detail ── */}
          <div className="lg:col-span-3">

            {/* Product image + info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

              {/* Images */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden bg-[#f5f0ea]">
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format';
                    }}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleWishlistToggle}
                      className={`p-2 bg-[#faf7f2] hover:bg-white rounded-full transition-all duration-300 shadow-sm ${
                        isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'
                      } ${isWishlistAnimating ? 'scale-125' : ''}`}
                    >
                      <Heart
                        size={18}
                        className={`transition-all duration-300 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                    <button className="p-2 bg-[#faf7f2] hover:bg-white rounded-full transition-colors shadow-sm">
                      <Share2 size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square bg-[#f5f0ea] overflow-hidden transition-all ${
                          selectedImage === index
                            ? 'opacity-100 ring-1 ring-gray-300'
                            : 'opacity-50 hover:opacity-75'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 25vw, 10vw"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.brand}</p>
                  <h1 className="text-2xl md:text-3xl font-light text-gray-900">{product.name}</h1>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < product.rating ? 'fill-gray-900 text-gray-900' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{product.reviews} reviews</span>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-light text-gray-900">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <>
                        <span className="text-sm text-gray-300 line-through">{formatPrice(product.oldPrice)}</span>
                        <span className="text-xs text-gray-400">Save {formatPrice(product.oldPrice - product.price)}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                {product.description && (
                  <p className="text-sm text-gray-500 leading-relaxed border-t border-b border-gray-200/50 py-4">
                    {product.description}
                  </p>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 text-xs border transition-colors ${
                            selectedColor === color
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-[#faf7f2]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 text-xs border transition-colors ${
                            selectedSize === size
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-[#faf7f2]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Qty</span>
                    <div className="flex items-center border border-gray-200 bg-[#faf7f2]">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                        disabled={quantity >= 10}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="flex-1 bg-gray-900 text-white px-6 py-3 text-xs tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 border border-gray-900 text-gray-900 px-6 py-3 text-xs tracking-wider hover:bg-gray-900 hover:text-white transition-colors bg-[#faf7f2]"
                    >
                      BUY NOW
                    </button>
                  </div>

                  {showSuccessMessage && (
                    <p className="text-xs text-green-600 text-center animate-pulse">
                      ✓ Added to cart successfully!
                    </p>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex items-center space-x-2">
                    <Truck size={14} className="text-gray-300" />
                    <span className="text-xs text-gray-500">Free shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw size={14} className="text-gray-300" />
                    <span className="text-xs text-gray-500">30-day returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-gray-300" />
                    <span className="text-xs text-gray-500">3-5 day delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield size={14} className="text-gray-300" />
                    <span className="text-xs text-gray-500">Lifetime warranty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-16">
              <div className="border-b border-gray-200/50">
                <div className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 text-xs tracking-wider transition-colors relative ${
                        activeTab === tab.id
                          ? 'text-gray-900 border-b border-gray-900'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <div className="prose prose-sm max-w-none text-gray-500">
                    <p className="text-sm leading-relaxed">
                      {product.description || 'No description available.'}
                    </p>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {[
                        ['Brand', product.brand],
                        ['Category', product.category],
                        ['Material', '18K Gold'],
                        ['Weight', '2.5g'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex py-2 border-b border-gray-200/50">
                          <span className="w-1/3 text-xs text-gray-400">{label}</span>
                          <span className="w-2/3 text-xs text-gray-600 capitalize">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-light text-gray-900">{product.rating}</span>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < product.rating ? 'fill-gray-900 text-gray-900' : 'text-gray-200'}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">Based on {product.reviews} reviews</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-200/50 pb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} size={12} className="fill-gray-900 text-gray-900" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-400">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-600">Amazing quality and fast delivery!</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Premium quality', 'Expert craftsmanship', 'Certified authentic', 'Gift ready', 'Lifetime maintenance', 'International warranty'].map(
                (highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-xs text-gray-500">{highlight}</span>
                  </div>
                )
              )}
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200/50">
                <h2 className="text-sm font-light text-gray-900 mb-6 tracking-wider">SIMILAR PRODUCTS</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {similarProducts.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} className="group block space-y-3">
                      <div className="relative aspect-square bg-[#f5f0ea] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.brand}</p>
                        <h3 className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm font-light text-gray-900">{formatPrice(item.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>{/* end right col */}
        </div>{/* end grid */}
      </div>

      <FooterSection />
    </div>
  );
}