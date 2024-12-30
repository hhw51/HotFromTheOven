// src/app/components/ProductForm.tsx
"use client";

import React, { useState } from "react";
import OrderButton from "./AllProducts/OrderButton";
import { useCart } from "../context/CartContext";

type ProductFormProps = {
  product: string;
  price: number;
  image: string;
  description: string;
};

type FormData = {
  product: string;
  quantity: number;
  size: string;
  specialInstructions: string;
  price: number;
  image: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, price, image, description }) => {
  const { addToCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    product,
    quantity: 1,
    size: "Regular",
    specialInstructions: "",
    price,
    image,
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let normalizedValue: string | number = value;

    if (name === "size") {
      // Normalize size input to ensure consistency
      normalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    if (name === 'quantity') {
      const parsed = parseInt(value, 10);
      normalizedValue = isNaN(parsed) ? 1 : parsed; // Ensure it's a number, default to 1
    }

    setFormData((prev) => ({ ...prev, [name]: normalizedValue }));
    console.log('Updated formData:', { ...formData, [name]: normalizedValue }); // Debug log
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart called with:", formData); // Debug log
    setIsAdding(true);
    addToCart(formData);
    setIsAdding(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order {product}</h1>
      <p className="text-lg mt-12 mb-6">
        {description}
      </p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          {/* Quantity Input */}
          <div>
            <label htmlFor="quantity" className="block font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          {/* Size Selection */}
          <div>
            <label htmlFor="size" className="block font-semibold mb-2">
              Size
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="Regular">Regular</option>
              <option value="Large">Large</option>
              <option value="Family Size">Family Size</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label htmlFor="specialInstructions" className="block font-semibold mb-2">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="e.g., Extra Cheese"
              className="border border-gray-300 rounded-lg p-2 w-full"
              rows={3}
            ></textarea>
          </div>

          {/* Add to Cart Button */}
          <div>
            <OrderButton 
              label={isAdding ? "Adding..." : "Add to Cart"} 
              onClick={handleAddToCart} 
              disabled={isAdding} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
