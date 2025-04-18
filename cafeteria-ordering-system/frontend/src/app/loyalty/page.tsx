'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type LoyaltyEntry = {
  orderId: number;
  amountSpent: number;
  pointsEarned: number;
  timestamp: string;
};

export default function LoyaltyPage() {
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<LoyaltyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/loyalty', {withCredentials: true});
        const data = response.data;

        setPoints(data.points);
        setHistory(data.history);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch loyalty data:', error);
        setLoading(false);
      }
    };

    fetchLoyaltyData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Loyalty Rewards</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Menu
        </Link>
      </div>

      {loading ? (
        <p>Loading loyalty points...</p>
      ) : (
        <>
          {/* 🎁 Reward Info Banner */}
          <div className="bg-yellow-100 p-3 rounded mb-4">
            <p className="text-yellow-800 font-medium">
              🎁 Loyalty Reward: Earn 50 points to get <span className="font-bold">$5 off</span> your next order!
            </p>
          </div>

          {/* 🏆 Current Points & Reward Actions */}
          <div className="bg-green-100 p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">
              You have <span className="text-green-700">{points} points</span>!
            </h2>
            <p className="text-sm text-gray-700 mt-1">Keep ordering to earn more rewards.</p>

            {points >= 50 ? (
              <div className="mt-2">
                <p className="text-green-700 font-semibold">You’re eligible for $5 off!</p>
                <button
                  className="mt-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => alert('🎉 $5 off reward redeemed! (Feature coming soon)')}
                >
                  Redeem 50 Points
                </button>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">
                Earn <span className="font-bold">{50 - points}</span> more points to unlock <span className="font-semibold">$5 off</span>!
              </p>
            )}
          </div>

          {/* 📜 Points History */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Points History</h2>

            {history.length === 0 ? (
              <p className="text-gray-500">No point history available.</p>
            ) : (
              history.map((entry) => (
                <div key={entry.orderId} className="border-b py-2 flex justify-between">
                  <div>
                    <p className="font-medium">Order #{entry.orderId}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()} • ${entry.amountSpent.toFixed(2)} spent
                    </p>
                  </div>
                  <div className="text-green-600 font-semibold">
                    +{entry.pointsEarned} pts
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
