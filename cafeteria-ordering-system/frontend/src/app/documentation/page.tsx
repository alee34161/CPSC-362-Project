// app/documentation/page.tsx
"use client";

export default function DocumentationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-lg leading-relaxed">
      <h1 className="text-5xl font-extrabold mb-10 text-center">📘 CSUF Cafeteria System Documentation</h1>

      {/* Getting Started */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🔑 Getting Started</h2>
        <p>Welcome to the CSUF Cafeteria System! To begin using the platform:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Create an account or log in with your CSUF credentials.</li>
          <li>Your role is automatically assigned based on your credentials.</li>
          <li>Navigate using the primary navigation menu at the top.</li>
        </ul>
      </section>

      {/* Menu Navigation */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🍽️ Menu Navigation</h2>
        <p>Our system provides access to both campus cafeteria options and local restaurant partners:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Toggle View:</strong> Switch between "Cafeteria" and "Local Restaurants" using the selector at the top of the menu page.</li>
        </ul>
      </section>

      {/* Employee Features */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">👩‍🍳 Employee Features</h2>
        <p>Employees have access to special tools for order handling:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Access the employee page for order management.</li>
          <li>Cafeteria staff: Manage cafeteria-specific operations.</li>
          <li>Delivery personnel: Access delivery management interface.</li>
        </ul>
      </section>

      {/* Help / FAQ */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Q:</strong> I forgot my password. What do I do?<br /><strong>A:</strong> Use the "Forgot Password" link on the login page.</li>
        </ul>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">💬 Need More Help?</h2>
        <p>
          Reach out through the "Help" link in the footer, or email us directly at <strong>support@cafecsuf.com</strong>.
        </p>
        <p className="mt-2">
          For urgent assistance, call our support line at (555) 123-4567 during operating hours (7:00 AM - 9:00 PM).
        </p>
      </section>
    </div>
  );
}