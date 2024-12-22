"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderButton from "../components/AllProducts/OrderButton";

const LasagnaRollsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    quantity: 1,
    specialInstructions: "",
    size: "Regular",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent default form submission behavior
    toast.success(`Order placed successfully!`, {
      position: "top-center",
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order Lasagna Rolls</h1>
      <p className="text-lg mt-12 mb-6">
        Delicious lasagna rolls, crafted with care just for you. Customize your order below!
      </p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="Party Size">Party Size</option>
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
              placeholder="e.g., No cheese, extra sauce, etc."
              className="border border-gray-300 rounded-lg p-2 w-full"
              rows={3}
            ></textarea>
          </div>

          {/* Reusable Order Button */}
          <div>
            <OrderButton label="Place Order" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LasagnaRollsPage;
