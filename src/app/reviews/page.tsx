// src/app/reviews/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

interface Review {
  id: number;
  content: string;
  visibility: string;
  added_by: string;
  stars: number;
  created_at: string;
}

const ReviewsPage: React.FC = () => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [stars, setStars] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch visible reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("visibility", "y")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      setMessage("Failed to load reviews.");
    } else {
      setReviews(data || []);
    }
    setLoadingReviews(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewContent.trim()) {
      setMessage("Please enter your review.");
      return;
    }

    if (!reviewerName.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const { error } = await supabase.from("reviews").insert([ 
      {
        content: reviewContent,
        visibility: "n", // Default to 'n' as per your requirement
        added_by: reviewerName,
        stars: stars,
      },
    ]);

    if (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit your review. Please try again.");
    } else {
      setReviewContent("");
      setReviewerName("");
      setStars(5);
      setMessage("Your review has been posted and will be up soon. Thank you for your response!");
    }

    setIsSubmitting(false);
  };

  // Generate avatar based on the reviewer's name (initials)
  const generateAvatar = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8">Customer Reviews</h1>

      {/* Review Submission Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add Your Review</h2>
        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.includes("failed")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          {/* Star Rating Input */}
          <div className="mb-4">
            <label htmlFor="stars" className="block text-gray-700 font-semibold mb-2">
              Your Rating
            </label>
            <select
              id="stars"
              value={stars}
              onChange={(e) => setStars(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value={5}>5 - Excellent</option>
              <option value={4.5}>4.5 - Very Good</option>
              <option value={4}>4 - Good</option>
              <option value={3.5}>3.5 - Average</option>
              <option value={3}>3 - Below Average</option>
              <option value={2.5}>2.5 - Poor</option>
              <option value={2}>2 - Very Poor</option>
              <option value={1.5}>1.5 - Terrible</option>
              <option value={1}>1 - Awful</option>
            </select>
          </div>

          {/* Review Content */}
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Display Reviews */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-md rounded-lg p-6 flex"
              >
                {/* User Avatar */}
                <div className="mr-4 flex-shrink-0">
                  <Image
                    src={generateAvatar(review.added_by)} // Generate avatar based on name
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  {/* Reviewer's Name and Stars */}
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.added_by}</span>
                    <div className="flex items-center">
                      {/* Display Stars */}
                      {Array.from({ length: 5 }, (_, index) => {
                        const starValue = index + 1;
                        if (review.stars >= starValue) {
                          return (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.342 9.397c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                          );
                        } else if (review.stars >= starValue - 0.5) {
                          return (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.342 9.397c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                          );
                        } else {
                          return (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-300"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.342 9.397c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                          );
                        }
                      })}
                      <span className="ml-2 text-gray-600">{review.stars}/5</span>
                    </div>
                  </div>
                  {/* Review Content */}
                  <p className="text-gray-800">{review.content}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
