"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '../../i18n';

export default function ForgotPassword() {
  const { t, i18n } = useTranslation();
  if (!i18n.isInitialized) {
    i18n.changeLanguage('en');
  }
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounnded-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">{t('forgotPassword.title')}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t('forgotPassword.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">
          {t('forgotPassword.resetButton')}
          </button>
        </form>
        {/* ✅ Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          {t('forgotPassword.backToHome')}
        </button>
      </div>
    </div>
  );
}
