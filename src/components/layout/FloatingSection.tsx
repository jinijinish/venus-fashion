"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion'; // or 'motion/react'
import { Phone, MessageCircle } from 'lucide-react';

const FloatingSection = () => {
  
  // 1. Explicitly type the variants as 'Variants'
  const iconVariants: Variants = {
    initial: { 
      scale: 0, 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      } 
    },
    hover: { 
      scale: 1.15, 
      filter: 'brightness(1.1)',
      // Note: 'yoyo' was deprecated, use 'repeat' instead
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 0.3 
      } 
    },
    tap: { 
      scale: 0.9 
    }
  };

  const floatAnimation: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/1234567890"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="bg-green-500 p-4 rounded-full shadow-lg text-white block"
      >
        <motion.div variants={floatAnimation} animate="animate">
          <MessageCircle size={28} />
        </motion.div>
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:+1234567890"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="bg-blue-600 p-4 rounded-full shadow-lg text-white block"
      >
        <motion.div variants={floatAnimation} animate="animate">
          <Phone size={28} />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default FloatingSection;