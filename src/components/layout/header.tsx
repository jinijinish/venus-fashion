"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, Search, ShoppingBag, User, Loader2, Heart, LogOut } from 'lucide-react';
import CollectionsDropdown from '../home/CollectionsDropdown';
import { products } from '@/service/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/login/LoginModal';

interface SearchSuggestion {
  id: string;
  name: string;
  category?: string;
  price: number;
  image: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Use auth context
  const { user, isAuthenticated, logout } = useAuth();
  
  // Use cart context
  const { cartCount } = useCart();
  
  // Use wishlist context
  const { wishlistCount } = useWishlist();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setShowSuggestions(false);
  }, [pathname]);

  // Handle click outside search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search function
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      
      // Simulate API delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter products based on search query
      const filtered = products
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5) // Limit to 5 suggestions
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image
        }));

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setIsSearchOpen(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setShowSuggestions(false);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // You can add any post-login logic here
    console.log('Login successful!');
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    router.push('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        message="Sign in to access your account and shopping cart"
      />

      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-xl shadow-lg' 
          : 'py-3 bg-transparent'
      }`}>
        <div className="max-w-[95%] lg:max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand with actual logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative w-15 h-15">
                  <Image
                    src="/vns.png"
                    alt="Brand Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-gray-900 cursor-pointer">
                  Venus
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8 text-sm">
                <li className="relative group">
                  <Link 
                    href="/"
                    className={`transition-colors ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-amber-700' 
                        : 'text-gray-900 hover:text-amber-700'
                    } ${pathname === '/' ? 'text-amber-700' : ''}`}
                  >
                    Home
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 bg-amber-700 ${
                    pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </li>
                
                <li className="relative group">
                  <Link 
                    href="/shop"
                    className={`transition-colors ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-amber-700' 
                        : 'text-gray-900 hover:text-amber-700'
                    } ${pathname === '/shop' ? 'text-amber-700' : ''}`}
                  >
                    Shop
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 bg-amber-700 ${
                    pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </li>
                
                <li className="relative group">
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-amber-700' 
                        : 'text-gray-900 hover:text-amber-700'
                    } ${pathname.includes('/collections') ? 'text-amber-700' : ''}`}
                  >
                    Collections
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 bg-amber-700 ${
                    pathname.includes('/collections') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                  
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <CollectionsDropdown />
                  </div>
                </li>
                
                <li className="relative group">
                  <Link 
                    href="/contact"
                    className={`transition-colors ${
                      isScrolled 
                        ? 'text-gray-900 hover:text-amber-700' 
                        : 'text-gray-900 hover:text-amber-700'
                    } ${pathname === '/contact' ? 'text-amber-700' : ''}`}
                  >
                    Contact
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 bg-amber-700 ${
                    pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </li>
              </ul>

              {/* Search Bar with Suggestions */}
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-amber-700 bg-white text-gray-900 placeholder-gray-500 text-sm w-64 transition-all duration-300"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {isSearching ? (
                      <Loader2 className="text-gray-500 animate-spin" size={18} />
                    ) : (
                      <Search className="text-gray-500 hover:text-amber-700 transition-colors" size={18} />
                    )}
                  </button>
                </form>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-lg shadow-xl overflow-hidden z-50 bg-white border border-gray-200">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.id)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ₹{product.price.toFixed(2)}
                            {product.category && ` • ${product.category}`}
                          </p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={handleSearch}
                      className="w-full px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 transition-colors font-medium text-center border-t border-gray-200"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link href="/wishlist" className="relative p-2 text-gray-900 hover:text-amber-700 transition-colors">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Dynamic Count */}
              <Link href="/cart" className="relative p-2 text-gray-900 hover:text-amber-700 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu - Conditional based on auth status */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitials()}
                    </div>
                    <ChevronDown size={16} className="text-gray-600 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-48 rounded-lg shadow-xl overflow-hidden bg-white border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-200"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Login Button */
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Search Toggle */}
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-lg bg-white shadow-md text-gray-900 transition-all duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white shadow-md text-gray-900 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (when toggled) */}
        {isSearchOpen && (
          <div className="md:hidden px-4 mt-2 pb-2">
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-700 bg-white text-gray-900 placeholder-gray-500"
                  autoFocus
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-500" size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-4 my-2 rounded-2xl p-4 bg-white shadow-xl border border-gray-200 transition-all duration-300">
            <ul className="space-y-4 font-medium">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    pathname === '/' 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-gray-900 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/shop')}
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    pathname === '/shop' 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-gray-900 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/collections')}
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    pathname.includes('/collections') 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-gray-900 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    pathname === '/contact' 
                      ? 'bg-amber-50 text-amber-700' 
                      : 'text-gray-900 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>
            
            {/* Mobile Cart, Wishlist and User Menu */}
            <div className="mt-4 px-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3">
                {/* Wishlist Icon for Mobile */}
                <Link 
                  href="/wishlist"
                  className="relative p-2 text-gray-900 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Icon for Mobile with Dynamic Count */}
                <Link 
                  href="/cart"
                  className="relative p-2 text-gray-900 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-sm font-medium">
                    {getUserInitials()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Header;