"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md fixed w-full z-50">
      {/* Left Section */}
      <div>
        {/* Instagram Icon on Desktop */}
        <Link
          href="https://www.instagram.com/hot.fromtheoven/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <Image
            src="/insta.jpg"
            alt="Instagram Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Home Icon on Mobile */}
        <Link
          href="/"
          className="block md:hidden text-gray-800 hover:text-orange-500"
        >
          <Image
            src="/home-icon.png"
            alt="Home Icon"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Center Section (Navigation Menu for Desktop) */}
      <nav className="hidden md:flex space-x-6 text-gray-800 font-semibold">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <Link href="/about" className="hover:text-orange-500">
          About
        </Link>
        <Link href="/menu" className="hover:text-orange-500">
          Menu
        </Link>
        <Link href="/contact" className="hover:text-orange-500">
          Contact
        </Link>
        <Link href="/reviews" className="hover:text-orange-500">
          Reviews
        </Link>
      </nav>

      {/* Right Section (Cart Icon) */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="relative cursor-pointer" onClick={openCart}>
          <Image src="/cart-icon.png" alt="Cart" width={24} height={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
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
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
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
          <Link
            href="/"
            className="block text-gray-800 hover:text-orange-500"
            onClick={closeSidebar} // Close sidebar on click
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-800 hover:text-orange-500"
            onClick={closeSidebar} // Close sidebar on click
          >
            About
          </Link>
          <Link
            href="/menu"
            className="block text-gray-800 hover:text-orange-500"
            onClick={closeSidebar} // Close sidebar on click
          >
            Menu
          </Link>
          <Link
            href="/contact"
            className="block text-gray-800 hover:text-orange-500"
            onClick={closeSidebar} // Close sidebar on click
          >
            Contact
          </Link>
          <Link
            href="/reviews"
            className="block text-gray-800 hover:text-orange-500"
            onClick={closeSidebar} // Close sidebar on click
          >
            Reviews
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
