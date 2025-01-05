import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  const products = [
    { image: "/lasagna.jpg", name: "Lasagna", price: "1500" },
    { image: "/brownies.jpg", name: "Brownies", price: "650" },
    { image: "/mac.jpg", name: "Alfredo Pasta", price: "1500" },
    { image: "/pasta.jpg", name: "Red Sauce Pasta", price: "1500" },
  ];

  return (
    <div className="px-4 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
