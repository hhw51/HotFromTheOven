"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AiOutlineCopy } from "react-icons/ai"; // Import the new copy icon

// Define a type for the cart item
type CartItem = {
  productName: string;
  product: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // For button state
  const [mobileNumber, setMobileNumber] = useState("");  // Store user input
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);  // To track success status

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    setCartItems(items);
    updateTotal(items);
  }, []);

  const updateTotal = (items: CartItem[]): void => {
    const total = items.reduce(
      (acc: number, item: CartItem) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  };
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy.");
    });
  };
  const handleRemove = (index: number): void => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
    updateTotal(newItems);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits, limit to 10 digits
    const inputValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(inputValue);
  };

  const handleProceedToPayment = async () => {
    // Validate the form fields
    if (!mobileNumber || !address) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderDetails = cartItems
        .map(
          (item) =>
            `${item.quantity}x ${item.product} (${item.size}) - PKR. ${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join(", ");
      const paymentInfo = `Total: PKR. ${totalAmount.toFixed(2)}`;

      const formData = new FormData();
      formData.append("orderDetails", orderDetails);
      formData.append("mobileNumber", `+92${mobileNumber}`);  // Concatenate +92 with the number
      formData.append("address", address);
      formData.append("paymentInfo", paymentInfo);

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send email.");
      }

      // Mark the order as successful and clear the cart
      localStorage.removeItem("cart");
      setCartItems([]);
      setIsSuccess(true); // Trigger success message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    // Show success message and prevent cart UI
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Thank You!</h1>
        <p className="text-center text-lg text-gray-700">
        Your order has been successfully placed. A representative will contact you soon. Thank you for trusting us!        </p>
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
            onClick={() => window.location.href = "/"}
          >
            Go Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
  <li 
    key={index} 
    className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
  >
    <div className="flex-shrink-0 mr-4">
      <img 
        src={item.imageUrl} 
        alt={item.product} 
        className="w-20 h-20 object-cover rounded-lg" 
      />
    </div>
    <div className="flex flex-col flex-grow">
      {/* Conditional rendering for product name */}
      <p className="text-lg font-semibold">
        {item.productName || `${item.product} - ${item.size}`}
      </p>
      <p className="text-gray-600">Quantity: {item.quantity}</p>
      <p className="text-gray-700 font-medium">PKR. {(item.price * item.quantity).toFixed(2)}</p>
    </div>
    <button 
      className="text-red-600 hover:text-red-800 font-semibold" 
      onClick={() => handleRemove(index)}
    >
      Remove
    </button>
  </li>
))}

        </ul>
      )}

      {/* Form Fields */}
      <div className="mt-6">
        <label className="block mb-2 text-lg font-semibold">Mobile Number</label>
        <div className="flex items-center">
          <span className="text-xl font-semibold text-gray-700 mr-2">+92</span>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your 10-digit mobile number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            maxLength={10}
          />
        </div>

        <label className="block mt-4 mb-2 text-lg font-semibold">Address</label>
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Bank Details */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Bank Details</h2>
        <p>Bank Name: <b>Standard Chartered</b></p>
        <p>Account Number: <b className="inline-flex items-center">
      01718014001 
      <AiOutlineCopy 
        className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
        onClick={() => handleCopyToClipboard("01718014001")} 
        title="Copy to clipboard" 
      />
    </b></p>
       <p>Account Title: <b> Ramsha Khalid</b></p>
      </div>

      {/* Total Amount and Proceed to Payment */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <p className="text-xl font-semibold">Total: PKR. {totalAmount.toFixed(2)}</p>
        <button
          className={`${
            isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 px-6 rounded-lg transition-colors`}
          disabled={isSubmitting}
          onClick={handleProceedToPayment}
        >
          {isSubmitting ? "Sending..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
