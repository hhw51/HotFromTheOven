// src/app/components/Cart/FloatingCartIcon.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

const FloatingCartIcon: React.FC = () => {
  const { cartCount, openCart } = useCart();

  return (
    <div className="fixed bottom-4 right-4 md:hidden z-50">
      <button
        onClick={openCart}
        className="relative bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        aria-label="Open Cart"
      >
        <Image src="/cart-icon.png" alt="Cart" width={24} height={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingCartIcon;
