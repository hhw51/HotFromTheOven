// src/app/brownies/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const BrowniesPage: React.FC = () => {
  return (
    <ProductForm
      product="Brownies"
      price={7.50}
      image="/brownies.jpg"
      description="Brownies! Customize your order below!"
    />
  );
};

export default BrowniesPage;
