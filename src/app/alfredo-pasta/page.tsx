// src/app/mac-n-cheese/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const MacNCheesePage: React.FC = () => {
  return (
    <ProductForm
      product="Alfredo Pasta"
      price={6.50}
      image="/mac.jpg" 
      description="Creamy and cheesy mac & cheese baked to perfection. Customize your order below!"
    />
  );
};

export default MacNCheesePage;
