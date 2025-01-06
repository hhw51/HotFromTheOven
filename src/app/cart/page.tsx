"use client";

import React, { useState, useEffect } from "react";

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
    const items = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    setCartItems(items);
    updateTotal(items);
  }, []);

  const updateTotal = (items: CartItem[]): void => {
    const total = items.reduce(
      (acc: number, item: CartItem) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  };

  const handleRemove = (index: number): void => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
    updateTotal(newItems);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{item.product} - {item.size}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-700 font-medium">PKR. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="text-red-600 hover:text-red-800 font-semibold"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Amount and Proceed to Payment */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <p className="text-xl font-semibold">Total: PKR. {totalAmount.toFixed(2)}</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
