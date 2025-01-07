"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const AlfredoPastaPage: React.FC = () => {
  return (
    <ProductForm
      product="Alfredo Pasta"
      price={1600} // Base price
      image="/pasta.jpg"
      description="Indulge in our creamy Alfredo Pasta, perfectly cooked with a luscious white sauce, savory garlic, and a sprinkle of Parmesan cheese. Customize your order below!"
      options={[
        { size: "Single Serving", price: 1600 },
        { size: "Dinner for Two", price: 3000 },
        { size: "Family Feast", price: 5800 },
      ]}
    />
  );
};

export default AlfredoPastaPage;
