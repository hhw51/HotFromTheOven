"use client";

import React from "react";

interface OrderButtonProps {
  label: string;
  onClick: (e?: React.FormEvent) => void; // Accepts a FormEvent or undefined
  className?: string; // Optional for additional styles
}

const OrderButton: React.FC<OrderButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default OrderButton;
