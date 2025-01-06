"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const BrowniePage: React.FC = () => {
  return (
    <ProductForm
      product="Brownies"
      price={650} // Base price for 2 brownies
      image="/brownies.jpg"
      description="Delicious brownies baked fresh, available in various flavors and sizes. Choose your favorite and enjoy!"
      options={[
        { size: "2 Brownies", price: 650 },
        { size: "4 Brownies", price: 1250 },
        { size: "8 Brownies", price: 2400 },
      ]}
    />
  );
};

export default BrowniePage;
