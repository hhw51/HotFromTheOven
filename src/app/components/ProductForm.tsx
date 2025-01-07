"use client";

import React, { useState } from "react";
import OrderButton from "./AllProducts/OrderButton";
import { useCart } from "../context/CartContext";

type ProductFormProps = {
  product: string;
  price: number;
  image: string;
  description: string;
  options: { size: string; price: number }[]; // Add options for size and price
  flavors?: { name: string; price: number }[]; // Add optional flavors for brownies
};

type FormData = {
  product: string;
  quantity: number | string;  // Allow quantity to be a string to handle empty input
  size: string;
  flavor?: string; // Optional flavor field
  price: number;
  image: string;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  price,
  image,
  description,
  options,
  flavors,
}) => {
  const { addToCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    product,
    quantity: 1,
    size: options[0]?.size || "Just for you", // Default to the first option
    flavor: flavors ? flavors[0]?.name : undefined, // Default flavor for brownies
    price: options[0]?.price || price,
    image,
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    const selectedOption = options.find((option) => option.size === selectedSize);

    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        size: selectedOption.size,
        price: selectedOption.price,
      }));
    }
  };

  const handleFlavorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFlavor = e.target.value;
    setFormData((prev) => ({
      ...prev,
      flavor: selectedFlavor,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        quantity: "",
      }));
      return;
    }

    const quantity = /^\d+$/.test(value) ? parseInt(value, 10) : 1;

    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(quantity, 1),
    }));
  };

  const handleAddToCart = () => {
    if (isAdding) return;
  
    const quantity = typeof formData.quantity === "string" ? parseInt(formData.quantity, 10) : formData.quantity;
  
    const validQuantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
  
    setFormData((prev) => ({
      ...prev,
      quantity: validQuantity,
    }));
  
    setIsAdding(true);
    addToCart({ ...formData, quantity: validQuantity });
    setIsAdding(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order {product}</h1>
      <p className="text-lg mt-12 mb-6">{description}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          {/* Size Selection */}
          <div>
            <label htmlFor="size" className="block font-semibold mb-2">
              Servings
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleSizeChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              {options.map((option) => (
                <option key={option.size} value={option.size}>
                  {option.size} - PKR. {option.price}
                </option>
              ))}
            </select>
          </div>

          {/* Flavor Selection (Only for Brownies) */}
          {flavors && (
            <div>
              <label htmlFor="flavor" className="block font-semibold mb-2">
                Choose Flavor
              </label>
              <select
                id="flavor"
                name="flavor"
                value={formData.flavor}
                onChange={handleFlavorChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                {flavors.map((flavor) => (
                  <option key={flavor.name} value={flavor.name}>
                    {flavor.name} - PKR. {flavor.price}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <label htmlFor="quantity" className="block font-semibold mb-2">
              Quantity
            </label>
            <input
              type="text" 
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
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
