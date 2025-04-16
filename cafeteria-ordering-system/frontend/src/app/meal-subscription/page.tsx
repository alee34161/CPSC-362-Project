"use client";

import React from "react";

export default function MealSubscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Meal Subscription Plan</h1>
        <p className="text-center text-gray-600 mb-2 text-xl font-semibold">$15/month</p>

        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li> One free meal per day</li>
          <li> 15% off additional purchases</li>
          <li> Free on-campus delivery</li>
          <li> Priority meal preparation during peak hours</li>
          <li> Access to exclusive monthly deals</li>
          <li> Auto-renews every month — cancel anytime</li>
        </ul>

        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
