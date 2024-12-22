"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md fixed w-full z-50">
      {/* Left Section (Logo) */}
      <div>
      <Link href="https://www.instagram.com/hot.fromtheoven/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/insta.jpg" 
            alt="Instagram Logo"
            width={40} // Set the width of the logo
            height={40} // Set the height of the logo
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Center Section (Navigation Menu for Desktop) */}
      <nav className="hidden md:flex space-x-6 text-gray-800 font-semibold">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <Link href="/about" className="hover:text-orange-500">About</Link>
        <Link href="/products" className="hover:text-orange-500">Products</Link>
    <Link href="/shop" className="hover:text-orange-500">Shop</Link>
        <Link href="/contact" className="hover:text-orange-500">Contact</Link>
      </nav>

      {/* Right Section (Reserve Button and Cart Icon) */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="relative">
          <Image src="/cart-icon.png" alt="Cart" width={24} height={24}  className="cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="block md:hidden text-gray-800 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-800"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Menu */}
        <nav className="mt-16 space-y-4 px-6">
          <Link href="/" className="block text-gray-800 hover:text-orange-500">
            Home
          </Link>
          <Link href="/about" className="block text-gray-800 hover:text-orange-500">
            About
          </Link>
          <Link href="/products" className="block text-gray-800 hover:text-orange-500">
            Products
          </Link>
          

          <Link href="/shop" className="block text-gray-800 hover:text-orange-500">
            Shop
          </Link>
          <Link href="/contact" className="block text-gray-800 hover:text-orange-500">
            Contact
          </Link>
        </nav>
      </div>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </header>
  );
};

export default Header;
