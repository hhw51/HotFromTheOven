"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const RedSaucePastaPage: React.FC = () => {
  return (
    <ProductForm
      product="Red Sauce Pasta"
      price={1500} // Base price
      image="/red-sauce-pasta.jpg"
      description="Enjoy our classic Red Sauce Pasta, cooked to perfection in a rich tomato-based sauce, enhanced with fresh basil and a touch of Parmesan. Customize your order below!"
      options={[
        { size: "Single Serving", price: 1500 },
        { size: "Dinner for Two", price: 2750 },
        { size: "Family Feast", price: 5500 },
      ]}
    />
  );
};

export default RedSaucePastaPage;
