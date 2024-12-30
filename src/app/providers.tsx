// src/app/Providers.tsx
"use client";

import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import CartModal from './components/Cart/CartModal';
import FloatingCartIcon from './components/Cart/FloatingCartIcon';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <Header />
      <CartModal />
      <FloatingCartIcon />
      <ToastContainer />
      {children}
    </CartProvider>
  );
};

export default Providers;
