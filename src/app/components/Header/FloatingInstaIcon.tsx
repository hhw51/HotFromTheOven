// src/app/components/Instagram/FloatingInstaIcon.tsx
"use client";

import React from 'react';
import Image from 'next/image';

const FloatingInstaIcon: React.FC = () => {
  return (
    <div className="fixed bottom-20 right-4 md:hidden z-50">
      <a
        href="https://www.instagram.com/hot.fromtheoven/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <Image
          src="/images.jpg" // Path to your colored Instagram logo
          alt="Instagram"
          width={50} // Matches the size used in FloatingCartIcon
          height={50}
          className="rounded-full" // Ensures the image itself is circular
        />
      </a>
    </div>
  );
};

export default FloatingInstaIcon;
