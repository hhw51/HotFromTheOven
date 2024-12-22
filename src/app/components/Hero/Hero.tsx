import React from 'react';

const Hero: React.FC = () => {
  return (
    <div
      className="relative w-full bg-cover bg-center h-[100vh]" // Increased height to full viewport
      style={{ backgroundImage: "url('/hero-image.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="text-center">
          {/* Adjusted spacing for "Hot From The Oven" */}
          <h2 className="text-lg font-semibold text-white uppercase tracking-wide mb-4">
            Hot From The Oven
          </h2>
          {/* Main heading */}
          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            Your Comfort Food, Crafted with Care
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
