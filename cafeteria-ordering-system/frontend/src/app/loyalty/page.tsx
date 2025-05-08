'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';

type LoyaltyEntry = {
  id: number;
  total: number;
  pointsEarned: number;
  status: string;
};

export default function LoyaltyPage() {
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) {
    i18n.changeLanguage('en');
  }
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<LoyaltyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDiscount = async() => {
  	try {
  		const response = await axios.post('http://localhost:8080/discount', {}, {withCredentials: true});
  		if(response.status === 200) {
  			alert('🎉 $5 off reward redeemed!');
  		} else if(response.status === 255) {
  			alert('Discount already applied!');
  		}
  		const updated = await axios.get('http://localhost:8080/currentuserread', {withCredentials: true});
  		const data = updated.data;
  		setPoints(data.loyaltyPoints);
  	} catch(error) {
  		console.error('Error redeeming points.', error);
  	}
  };

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/currentuserread', {withCredentials: true});
        const data = response.data;
        const responso = await axios.get('http://localhost:8080/ordercustomerview', {withCredentials: true});
        const orderdata = responso.data

        setPoints(data.loyaltyPoints);
        setHistory(orderdata);
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
        <h1 className="text-2xl font-bold">{t('loyalty.title')}</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
        {t('loyalty.back')}
        </Link>
      </div>

      {loading ? (
        <p>{t('loyalty.loading')}</p>
      ) : (
        <>
          {/* 🎁 Reward Info Banner */}
          <div className="bg-yellow-100 p-3 rounded mb-4">
            <p className="text-yellow-800 font-medium">
              {t('loyalty.rewardBanner')}
            </p>
          </div>

          {/* 🏆 Current Points & Reward Actions */}
          <div className="bg-green-100 p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">
              {t('loyalty.points', { points })}
            </h2>
            <p className="text-sm text-gray-700 mt-1">{t('loyalty.keepOrdering')}</p>

            {points >= 50 ? (
              <div className="mt-2">
                <p className="text-green-700 font-semibold">{t('loyalty.eligible')}</p>
                <button
                  className="mt-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  onClick={handleDiscount}
                >
                  {t('loyalty.redeemButton')}
                </button>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">
                {t('loyalty.earnMore', { needed: 50 - points })}
              </p>
            )}
          </div>

          {/* 📜 Points History */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{t('loyalty.historyTitle')}</h2>

            {history.length === 0 ? (
              <p className="text-gray-500">{t('loyalty.noHistory')}</p>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className="border-b py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{t('loyalty.order', { id: entry.id })}</p>
                    <p className="text-sm text-gray-500">
                      {t('loyalty.statusAndTotal', { status: entry.status, total: entry.total })}
                    </p>
                  </div>
                  <div className="text-green-600 font-semibold">
                    {t('loyalty.pointsEarned', { pts: entry.pointsEarned })}
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
