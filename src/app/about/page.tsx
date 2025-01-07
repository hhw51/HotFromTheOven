"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          About Us
        </h1>
        <p className="text-lg leading-8 text-gray-600 mb-8 text-center">
          At our bakery, we believe in crafting moments of joy through our
          delicious and irresistible creations. Our mission is to deliver
          premium-quality treats that leave a lasting impression.
        </p>
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              1
            </div>
            <p className="text-lg text-gray-700">
              Our brownies are baked fresh daily, ensuring you get the best
              flavor and texture in every bite.
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              2
            </div>
            <p className="text-lg text-gray-700">
              We use only the finest ingredients to create products that not
              only taste amazing but also make your celebrations special.
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              3
            </div>
            <p className="text-lg text-gray-700">
              From classic flavors to seasonal specialties, we’re constantly
              innovating to surprise and delight our customers.
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-lg text-gray-600">
          Thank you for choosing us to make your days sweeter. We look forward
          to serving you!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
