// app/documentation/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Added for routing
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  { category: 'Ordering', questions: [
    { q: "How do I place an order?", a: "Browse the menu, add items to your cart, and click checkout to place your order." },
    { q: "Can I customize items in my order?", a: "Yes! You can add notes to each item in the cart for customizations." },
    { q: "How do I view my cart?", a: "Click the cart icon on the top right to view and edit your cart." },
    { q: "Can I cancel or change my order after placing it?", a: "You cannot cancel or change an order once it is being prepared." },
    { q: "How do I check my order status or tracking?", a: "Go to the tracking page to see live updates on your order." },
  ]},
  { category: 'Payment', questions: [
    { q: "What payment methods are accepted?", a: "Currently, we accept all major credit/debit cards." },
    { q: "When am I charged for my order?", a: "You are charged immediately after placing your order." },
    { q: "Is my payment information secure?", a: "Yes, we use secure encryption to protect your payment data." },
  ]},
  { category: 'Loyalty Rewards', questions: [
    { q: "How do I earn loyalty points?", a: "You earn points every time you place an order through the system." },
    { q: "How many points do I get per order?", a: "You earn 10 points per $1 spent." },
    { q: "Where can I see my current points?", a: "Go to the loyalty rewards page to view your current balance." },
    { q: "What can I redeem my points for?", a: "Points can be redeemed for discounts, free meals, and more." },
    { q: "How do I redeem my loyalty reward?", a: "You can redeem them at checkout when your balance is enough." },
  ]},
  { category: 'Account', questions: [
    { q: "How do I sign up or log in?", a: "Use the signup or login page with your email and password." },
    { q: "What if I forget my password?", a: "Click 'Forgot Password' on the login screen to reset it." },
    { q: "How do I update my phone number, location, or profile info?", a: "Go to the account settings page to update your info." },
  ]},
  { category: 'Delivery', questions: [
    { q: "How long does delivery take?", a: "Delivery time may vary based on availability and location. Please check with the cafeteria staff for more info." },
    { q: "Where do you deliver?", a: "Currently, deliveries are limited to nearby areas around the cafeteria or campus. Exact locations may vary." },
    { q: "Can I choose a delivery time?", a: "Delivery time selection is not available at the moment, but future updates may include this feature." }
  ]},
];

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const router = useRouter();

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">📖 Help & FAQ</h1>

      {/* Back to Dashboard Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {faqItems.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.category}</h2>
          <div className="space-y-2">
            {section.questions.map(({ q, a }) => (
              <div key={q} className="border rounded-lg p-4 bg-white shadow">
                <button
                  onClick={() => toggleQuestion(q)}
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800"
                >
                  {q}
                  {openQuestion === q ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openQuestion === q && (
                  <p className="mt-2 text-sm text-gray-600">{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}