// pages/cart.tsx
"use client"

import React, { useState, useEffect } from 'react';

// import Link from 'next/link';

// Define a type for the cart item
type CartItem = {
  product: string;
  size: string;
  quantity: number;
  price: number;
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCartItems(items);
    updateTotal(items);
  }, []);

  const updateTotal = (items: CartItem[]): void => {
    const total = items.reduce((acc: number, item: CartItem) => acc + item.quantity * item.price, 0);
    setTotalAmount(total);
  };

  const handleRemove = (index: number): void => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    updateTotal(newItems);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center border-b pb-2 mb-2">
            <div>
              <p>{item.product} - {item.size}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <button className="text-red-500" onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-6">
        <p className="font-bold">Total: ${totalAmount.toFixed(2)}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPage;
