// src/app/lasagna/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const LasagnaPage: React.FC = () => {
  return (
    <ProductForm
      product="Lasagna"
      price={8.00}
      image="/images/lasagna.jpg" // Ensure this image exists in public/images/
      description="Classic Italian lasagna layered with rich tomato sauce, melted cheese, and perfectly cooked noodles. Customize your order below!"
    />
  );
};

export default LasagnaPage;
