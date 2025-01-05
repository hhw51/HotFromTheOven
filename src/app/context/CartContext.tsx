// src/app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

type CartItem = {
  product: string;
  size: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  image?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  updateQuantity: (index: number, quantity: number) => void;
  totalAmount: number;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load cart from localStorage on mount
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
      setCartItems(savedCart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever cartItems change
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to set cart in localStorage:", error);
    }

    // Update total amount
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalAmount(total);

    // Update cart count
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    console.log("🥂 addToCart called with item:", item);
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (prevItem) => prevItem.product === item.product && prevItem.size === item.size
      );

      if (existingIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += item.quantity;
        console.log(`💀 Updating quantity for existing item: ${item.product}, New Quantity: ${updatedItems[existingIndex].quantity}`);
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        console.log(`Adding new item: ${item.product}`);
        return [...prevItems, item];
      }
    });

    toast.success(`${item.product} added to cart!`, {
      position: "top-center",
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
    toast.info(`Item removed from cart.`, {
      position: "top-center",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info(`Cart cleared.`, {
      position: "top-center",
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = quantity;
      return newItems;
    });
    toast.info(`Updated quantity for ${cartItems[index].product}.`, {
      position: "top-center",
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, clearCart, 
      updateQuantity, totalAmount, cartCount, openCart, closeCart, isCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
