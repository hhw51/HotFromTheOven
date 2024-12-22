"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-[300px] md:w-[350px] mx-auto">
      {/* Image Section */}
      <div className="w-full h-[200px] sm:h-[220px] md:h-[250px] relative cursor-pointer" onClick={toggleModal}>
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Product Info Section */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-orange-500 text-xl mt-2">PKR {price}</p>
      </div>

      {/* Modal for Full-Size Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={toggleModal}
        >
          <div className="relative max-w-screen-md w-full">
            <Image
              src={image}
              alt={name}
              layout="responsive"
              width={600}
              height={600}
              className="rounded-lg"
            />
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
