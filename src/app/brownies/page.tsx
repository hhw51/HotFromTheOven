"use client";

import React, { useState } from "react";
import OrderButton from "../components/AllProducts/OrderButton";
import { useCart } from "../context/CartContext";

const BrowniesPage: React.FC = () => {
  const [flavor, setFlavor] = useState("Walnut Brownies");
  const [price, setPrice] = useState(650); 
  const [formData, setFormData] = useState({
    product: "Brownies",
    quantity: 1,
    size: "2 Brownies", // Default size
    price: 650, // Default price for 2 Walnut Brownies
    image: "/brownies.jpg",
    flavor: "Walnut Brownies", // Add flavor to formData
  });

  const { addToCart } = useCart();

  const handleFlavorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFlavor = e.target.value;
    setFlavor(selectedFlavor);
    if (selectedFlavor === "Walnut Brownies") {
      setPrice(650);
    } else if (selectedFlavor === "Salted Caramel Brownies") {
      setPrice(750);
    } else if (selectedFlavor === "Nutella Brownies") {
      setPrice(750);
    }

    // Update the flavor in formData as well
    setFormData((prev) => ({
      ...prev,
      flavor: selectedFlavor,
    }));
  };

  const [isAdding, setIsAdding] = useState(false);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    let newPrice = 650; // Default price for 2 brownies

    if (selectedSize === "4 Brownies") {
      newPrice = 1200;
    } else if (selectedSize === "8 Brownies") {
      newPrice = 2000;
    }

    setFormData((prev) => ({
      ...prev,
      size: selectedSize,
      price: newPrice,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // If the input is cleared, set quantity to 0 (or handle as you prefer)
    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        quantity: 0, // Default to 0 if input is cleared
      }));
      return;
    }
  
    // Ensure the input is a valid number
    const quantity = /^\d+$/.test(value) ? parseInt(value, 10) : 0;
  
    setFormData((prev) => ({
      ...prev,
      quantity: quantity, // Ensure the quantity is a number
    }));
  };
  

  const handleAddToCart = () => {
    if (isAdding) return;
    const quantity = typeof formData.quantity === "string" ? parseInt(formData.quantity, 10) : formData.quantity;
    const validQuantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
    
    // Create a readable product name with flavor and size
    const productName = `${flavor} - ${formData.size}`;
  
    setFormData((prev) => ({
      ...prev,
      quantity: validQuantity,
      productName, // Include the formatted product name
    }));
  
    setIsAdding(true);
    addToCart({
      ...formData,
      quantity: validQuantity,
      productName, // Pass the formatted product name
    });
    setIsAdding(false);
  };
  

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order {formData.product}</h1>
      <p className="text-lg mt-12 mb-6">Delicious brownies baked fresh, available in various flavors and sizes. Choose your favorite and enjoy!</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          {/* Flavor Selection */}
          <div>
            <label htmlFor="flavor" className="block font-semibold mb-2">
              Select Flavor
            </label>
            <select
              id="flavor"
              name="flavor"
              value={flavor}
              onChange={handleFlavorChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="Walnut Brownies">Walnut Brownies</option>
              <option value="Salted Caramel Brownies">Salted Caramel Brownies</option>
              <option value="Nutella Brownies">Nutella Brownies</option>
            </select>
          </div>

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
              <option value="2 Brownies">2 Brownies - PKR {price}</option>
              <option value="4 Brownies">4 Brownies - PKR 1200</option>
              <option value="8 Brownies">8 Brownies - PKR 2000</option>
            </select>
          </div>

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
              inputMode="numeric" // Ensures numeric keyboard for mobile
              pattern="[0-9]*" // Restricts to digits
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

export default BrowniesPage;
