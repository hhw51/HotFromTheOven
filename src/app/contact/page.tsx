"use client";

import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Add email sending logic here
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Contact Us
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Have a question or a special request? We’d love to hear from you!
          Please fill out the form below, and we’ll get back to you as soon as
          possible.
        </p>
        {isSubmitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-md text-center">
            Thank you for your message! We will get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
