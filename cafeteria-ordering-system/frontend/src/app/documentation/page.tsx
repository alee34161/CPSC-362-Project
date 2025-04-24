// app/documentation/page.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  { category: 'Ordering', questions: [
    "How do I place an order?",
    "Can I customize items in my order?",
    "How do I view my cart?",
    "Can I cancel or change my order after placing it?",
    "How do I check my order status or tracking?",
  ]},
  { category: 'Payment', questions: [
    "What payment methods are accepted?",
    "When am I charged for my order?",
    "Is my payment information secure?",
  ]},
  { category: 'Loyalty Rewards', questions: [
    "How do I earn loyalty points?",
    "How many points do I get per order?",
    "Where can I see my current points?",
    "What can I redeem my points for?",
    "How do I redeem my loyalty reward?",
    "Do points expire?",
  ]},
  { category: 'Account', questions: [
    "How do I sign up or log in?",
    "What if I forget my password?",
    "How do I update my phone number, location, or profile info?",
  ]},
  { category: 'Delivery', questions: [
    "How long does delivery take?",
    "Where does the cafeteria deliver to?",
    "Can I choose a delivery time?",
  ]},
  { category: 'Technical Help', questions: [
    "The app isn't working — what should I do?",
    "I didn’t get my confirmation email.",
    "How do I contact support?",
  ]},
  { category: 'Mobile Access', questions: [
    "Is there a mobile app?",
    "Can I order from my phone or tablet?",
  ]},
];

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📖 Help & FAQ</h1>

      {faqItems.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.category}</h2>
          <div className="space-y-2">
            {section.questions.map((q) => (
              <div key={q} className="border rounded-lg p-4 bg-white shadow">
                <button
                  onClick={() => toggleQuestion(q)}
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800"
                >
                  {q}
                  {openQuestion === q ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openQuestion === q && (
                  <p className="mt-2 text-sm text-gray-600 italic">[Your answer here]</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}