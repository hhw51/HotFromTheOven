import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white uppercase tracking-wide">Bakery Sweet</h2>
          <h1 className="mt-4 text-5xl font-bold text-white sm:text-6xl">The Best Selling Bakery Theme</h1>
          <p className="mt-4 text-lg text-white">In the food category of all time</p>
          <button className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-full text-lg hover:bg-orange-600 focus:outline-none">
            Opening Hours
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
