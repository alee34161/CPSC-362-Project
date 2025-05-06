'use client'; 

import Link from "next/link";
import '../i18n';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">{t('welcome')}</h1>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => changeLanguage('en')}
          className="px-4 py-2 bg-gray-200 rounded-md hover:text-gray-800 hover:bg-gray-300"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('es')}
          className="px-4 py-2 bg-gray-200 rounded-md hover:text-gray-800 hover:bg-gray-300"
        >
          Español
        </button>
      </div>
      <p className="text-lg mt-2">{t('loginPrompt')}</p>
      <Link href="/login">
        <button className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md">
        {t('goToLogin')}
        </button>
      </Link>
    </div>
  );
}