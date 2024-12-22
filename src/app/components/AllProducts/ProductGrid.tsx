import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const products = [
    { image: '/brioche.jpg', name: 'Brioche', price: '24' },
    { image: '/cookies.jpg', name: 'Cookies', price: '38' },
    { image: '/sandwich.jpg', name: 'Sandwich', price: '56' },
    { image: '/pancake.jpg', name: 'Pancake', price: '62' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
