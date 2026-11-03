"use client";

import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  length?: string;
  deliveryTime?: string;
}

const CartSection = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart.map((item: any) => ({ ...item, id: Number(item.id) })));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (!isLoading) localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, isLoading]);

  const updateQuantity = (id: number, delta: number, color?: string, size?: string) => {
    setCartItems(prev => prev.map(item => {
      if (Number(item.id) === Number(id) && item.color === color && item.size === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number, color?: string, size?: string) => {
    setCartItems(prev => prev.filter(item => 
      !(Number(item.id) === Number(id) && item.color === color && item.size === size)
    ));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-neutral-400">Loading...</div>;

  return (
    <div className="w-full min-h-screen pt-25 bg-white py-12">
      <section className="max-w-[90%] lg:max-w-[90%] mx-auto px-6 font-sans text-neutral-900">
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-neutral-200 pb-4 mb-8 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-12">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-neutral-100 md:border-none pb-8 md:pb-0">
                
                {/* ITEM COLUMN */}
                <div className="col-span-1 md:col-span-6 flex space-x-6">
                  <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-neutral-50" />
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-sm font-medium tracking-widest uppercase">{item.name}</h3>
                    <div className="text-[11px] text-neutral-500 leading-relaxed space-y-0.5 pt-1">
                      {item.color && <p>Color: {item.color}</p>}
                      {item.size && <p>Size: {item.size}</p>}
                      {item.length && <p>Length: {item.length}</p>}
                      {item.deliveryTime && <p>Delivery Time: {item.deliveryTime}</p>}
                    </div>
                    <button className="text-[10px] underline pt-2 text-neutral-400 text-left hover:text-black">Change</button>
                  </div>
                </div>

                {/* PRICE COLUMN */}
                <div className="col-span-2 hidden md:flex items-center justify-center text-sm">
                  ₹{item.price.toLocaleString()}
                </div>

                {/* QUANTITY COLUMN */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-neutral-200 px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, -1, item.color, item.size)} className="p-1"><Minus size={12} /></button>
                    <span className="px-4 text-xs">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1, item.color, item.size)} className="p-1"><Plus size={12} /></button>
                  </div>
                </div>

                {/* TOTAL COLUMN */}
                <div className="col-span-2 flex items-center justify-end space-x-4 text-sm font-medium">
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-neutral-400 hover:text-black">
                    <X size={18} strokeWidth={1} />
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal Section */}
            <div className="flex flex-col items-end pt-12 border-t border-neutral-200">
              <div className="w-full md:w-64 space-y-4">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-neutral-400 italic text-right">Taxes and shipping calculated at checkout</p>
                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-neutral-800 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 italic mb-8">Your bag is empty.</p>
            <Link href="/shop" className="text-[11px] border-b border-black pb-1 uppercase tracking-widest">Continue Shopping</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartSection;