// src/app/mac-n-cheese/page.tsx
"use client";

import React from "react";
import ProductForm from "../components/ProductForm";

const MacNCheesePage: React.FC = () => {
  return (
    <ProductForm
      product="Mac & Cheese"
      price={6.50}
      image="/images/mac-n-cheese.jpg" // Ensure this image exists in public/images/
      description="Creamy and cheesy mac & cheese baked to perfection. Customize your order below!"
    />
  );
};

export default MacNCheesePage;
