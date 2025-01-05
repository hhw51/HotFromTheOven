// src/app/red-sauce-pasta/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const RedSaucePastaPage: React.FC = () => {
  return (
    <ProductForm
      product="Red Sauce Pasta"
      price={7.50}
      image="/pasta.jpg" 
      description="Savory red sauce pasta with a blend of herbs and spices. Customize your order below!"
    />
  );
};

export default RedSaucePastaPage;
