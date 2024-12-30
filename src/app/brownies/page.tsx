// src/app/brownies/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const BrowniesPage: React.FC = () => {
  return (
    <ProductForm
      product="Red Sauce Pasta"
      price={7.50}
      image="/images/red-sauce-pasta.jpg"
      description="Savory red sauce pasta with a blend of herbs and spices. Customize your order below!"
    />
  );
};

export default BrowniesPage;
