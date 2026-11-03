"use client";

import React from 'react';
import { Facebook, Twitter, Youtube, MapPin, Phone } from 'lucide-react';
import Image from 'next/image'; // If using Next.js
// If not using Next.js, use regular img tag: <img src="/logo.png" alt="Venus Logo" />

const FooterSection = () => {
  return (
    <footer className="bg-[#9A7B66] text-[#E5D9D0] py-12 px-6 md:px-16 rounded-br-[80px]">
      <div className="max-w-[90%] lg:max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Venus Column with Logo */}
          <div className="space-y-4">
            {/* Logo added here */}
            <div className="flex items-center gap-2">
              {/* Option 1: Using Next.js Image component */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image 
                  src="/vns.png" // Update with your logo path
                  alt="Venus Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              
              {/* Option 2: Using img tag (if not using Next.js) */}
              {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="/venus-logo.png" 
                  alt="Venus Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div> */}
              
              <h3 className="text-xl font-serif text-white">Venus</h3>
            </div>
            
            <p className="text-sm leading-relaxed opacity-90">
              Discover the beauty of handcrafted jewelry at Venus. 
              Each piece tells a unique story, designed to celebrate 
              your individuality and style with timeless elegance.
            </p>
          </div>

          {/* Contact & Address Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white">Visit Us</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <p>
                  #01, Rajasekaran Street,<br />
                  Dr. Radhakrishnan Salai,<br />
                  Mylapore, Chennai - 600004
                </p>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+9173580424075" className="hover:text-white transition-colors">
                  +91 73580424075
                </a>
              </div>
            </div>
          </div>

          {/* Help Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white">Help</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white">Shop</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:text-white transition-colors">New Arrival</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bestselling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Moska's Choice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Summer Collection</a></li>
            </ul>
          </div>
        </div>

        {/* Connect Row - Moved to separate row for better layout */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-serif text-white">Connect With Us</h3>
            <div className="flex gap-3">
              <a href="#" className="bg-white p-2 rounded-full text-[#9A7B66] hover:bg-opacity-90 transition-all">
                <Facebook size={18} fill="currentColor" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full text-[#9A7B66] hover:bg-opacity-90 transition-all">
                <Twitter size={18} fill="currentColor" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full text-[#9A7B66] hover:bg-opacity-90 transition-all">
                <Youtube size={18} fill="currentColor" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#B49A88] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © 2021 Venus • All Rights Reserved
          </p>
          <p className="text-sm opacity-90 font-light tracking-wide text-center">
            Discover Elegant Jewelry Collections | Necklaces, Earrings, Bracelets & Rings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;