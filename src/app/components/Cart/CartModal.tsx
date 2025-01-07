// src/app/components/Cart/CartModal.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

const CartModal: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={closeCart}>
      <div 
        className="absolute right-4 top-16 bg-white p-4 rounded-lg w-80 shadow-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-2 border-b">
                  <div className="flex items-center space-x-2">
                    {item.image && (
                      <Image src={item.image} alt={item.product} width={40} height={40} className="rounded" />
                    )}
                    <div>
                    <p className="text-lg font-semibold">
        {item.productName || `${item.product} - ${item.size}`}
      </p>                      {item.specialInstructions && (
                        <p className="text-sm text-gray-600">Note: {item.specialInstructions}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                      className="w-12 border rounded p-1 text-center"
                    />
                    <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm-1 0a1 1 0 012 0v4a1 1 0 11-2 0v-4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 011 1v1H4V5zm0 2v8a2 2 0 002 2h8a2 2 0 002-2V7H4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">PKR. {totalAmount}</span>
            </div>
            <div className="flex justify-end">
              <Link href="/cart">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={closeCart}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
