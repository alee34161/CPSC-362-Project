"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../../i18n';


export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) {
    i18n.changeLanguage('en');
  }
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    streetaddress: "",
    city: "",
    state: "",
    zipcode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    delivery: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
    try {
    	const response = await axios.post('http://localhost:8080/orderadd', {
    		delivery: formData.delivery
    	}, {
    		headers: {
    			'Content-Type': 'application/json'
    		}, withCredentials: true
    	});
		if(response.status === 200) {
    		router.push("/tracking");
    	} else {
    		alert("unexpected response");
    	}
    } catch (error : any) {
    	if(error.response.status === 400) {
    		alert("Not enough items in cafeteria inventory to fulfill order. Please lower quantity.");
    		router.push("/cart");
    	}
      else {
      alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">{t('checkout.title')}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder={t('checkout.fullName')}
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="streetaddress"
            placeholder={t('checkout.streetAddress')}
            value={formData.streetaddress}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="city"
            placeholder={t('checkout.city')}
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="state"
            placeholder={t('checkout.state')}
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="zipcode"
            placeholder={t('checkout.zipCode')}
            value={formData.zipcode}
            onChange={handleChange}
            className="border p-2 rounded-md"
            pattern="\d{5}"
            title={t('checkout.zipCodeError')}
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder={t('checkout.cardNumber')}
            value={formData.cardNumber}
            onChange={handleChange}
            className="border p-2 rounded-md"
            pattern="\d{16}"
            title={t('checkout.cardNumberError')}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder={t('checkout.expiryDate')}
            value={formData.expiryDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
            pattern="^(0[1-9]|1[0-2])\/\d{2}$"
            title={t('checkout.expiryDateError')}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder={t('checkout.cvv')}
            value={formData.cvv}
            onChange={handleChange}
            className="border p-2 rounded-md"
            pattern="\d{3}"
            title={t('checkout.cvvError')}
            required
          />
          <input
            type="text"
            name="delivery"
            placeholder={t('checkout.delivery')}
            value={formData.delivery}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {t('checkout.placeOrder')}
          </button>
        </form>

        {/* Back to Cart */}
        <button
          onClick={() => router.push("/cart")}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          {t('checkout.backToCart')}
        </button>
      </div>
    </div>
  );
}
