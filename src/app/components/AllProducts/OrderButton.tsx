// src/app/components/AllProducts/OrderButton.tsx
"use client";

import React from "react";

type OrderButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const OrderButton: React.FC<OrderButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      type="button" // Explicitly set the button type
      onClick={onClick}
      disabled={disabled} // Disable the button if needed
      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default OrderButton;
