"use client";

import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function MealSubscriptionPage() {
	const [subscribed, setSubscribed] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:8080/currentuserread', { withCredentials: true })
		.then((response) => {
			setSubscribed(response.data.subscribed);
		})
		.catch((error) => {
			console.error('Error fetching user data:', error);
		});
	}, []);

	const handleSubscribe = async () => {
		try {
			const response = await axios.post('http://localhost:8080/subscribe', null, {withCredentials: true});

			if(response.status === 201) {
				alert("Subscribed! Fees will be taken from future paychecks.");
				setSubscribed(true);
			} else if (response.status === 202) {
				alert("Unsubscribed!")
				setSubscribed(false);
			} else {
				alert('Error: Unrecognized status from server.');
			}
		} catch(error) {
			console.error('Error updating subscription status.');
		}
	};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Meal Subscription Plan</h1>
        <p className="text-center text-gray-600 mb-2 text-xl font-semibold">$15/month</p>

        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li> 15% off additional purchases</li>
          <li> Free on-campus delivery</li>
          <li> Priority meal preparation during peak hours</li>
          <li> Access to exclusive monthly deals</li>
          <li> Auto-renews every month — cancel anytime</li>
        </ul>

		<div className="mt-4 text-center text-xl font-semibold text-gray-800">
			{subscribed === null ? "Loading..." : subscribed ? "You are subscribed!" : "You are not subscribed."}
		</div>
		

        <div className="mt-8 flex justify-center"
        onClick={() => handleSubscribe()}>
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Change Subscription Status
          </button>
        </div>
      </div>
    </div>
  );
}
