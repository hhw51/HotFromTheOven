"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const LasagnaPage: React.FC = () => {
  return (
    <ProductForm
      product="Red Sauce Pasta"
      price={1500} // Base price
      image="/pasta.jpg"
      description="Classic Italian lasagna layered with rich tomato sauce, melted cheese, and perfectly cooked noodles. Customize your order below!"
      options={[
        { size: "Just for you", price: 1500 },
        { size: "Two for the table", price: 2750 },
        { size: "Four’s a party", price: 5500 },
      ]}
    />
  );
};

export default LasagnaPage;
