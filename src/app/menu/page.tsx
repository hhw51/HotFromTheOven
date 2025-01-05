// src/app/menu/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  image: string;
  price: string;
  slug: string;
}

const products: Product[] = [
  {
    name: "Brownies",
    description: "Indulge in our rich and fudgy brownies, baked to perfection!",
    image: "/brownies.jpg",
    price: "650",
    slug: "brownies",
  },
  {
    name: "Alfredo Pasta",
    description: "Creamy Alfredo sauce tossed with al dente pasta for a delightful meal.",
    image: "/mac.jpg",
    price: "1500",
    slug: "alfredo-pasta",
  },
  {
    name: "Red Sauce Pasta",
    description: "Tangy and savory red sauce pasta that's sure to satisfy your cravings.",
    image: "/pasta.jpg",
    price: "1500",
    slug: "red-sauce-pasta",
  },
  {
    name: "Lasagna",
    description: "Hearty layers of pasta, cheese, and savory meat sauce in every bite.",
    image: "/lasagna.jpg",
    price: "1500",
    slug: "lasagna",
  },
];

const MenuPage: React.FC = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8">Our Delicious Menu</h1>
      
      {/* Menu Image */}
      <div className="flex justify-center mb-12">
        <div
          className="cursor-zoom-in w-full max-w-3xl relative"
          onClick={toggleMenuModal}
        >
          <Image
            src="/menu.jpg"
            alt="Menu"
            width={800}
            height={600}
            className="rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Menu Image Overlay */}
      {isMenuModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={toggleMenuModal}
        >
          <div
            className="relative max-w-screen-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <Image
              src="/menu.jpg"
              alt="Full Menu"
              width={1200}
              height={900}
              className="rounded-lg"
            />
            <button
              onClick={toggleMenuModal}
              className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.slug} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4 text-center">{product.description}</p>
            <p className="text-xl font-bold mb-4">PKR {product.price}</p>
            <Link href={`/${product.slug}`}>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                Order Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
