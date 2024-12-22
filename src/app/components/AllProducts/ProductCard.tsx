"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent routing when clicking on the image or if the modal is open
    if ((e.target as HTMLElement).closest(".image-section") || isModalOpen) {
      return;
    }

    // Redirect to product details page
    router.push(`${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div
        className="image-section cursor-zoom-in w-full h-48 relative"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click propagation
          toggleModal();
        }}
      >
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform transform group-hover:scale-105 w-full h-48 object-cover"
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
          onClick={(e) => {
            e.stopPropagation(); // Prevent background click from navigating
            toggleModal();
          }}
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
