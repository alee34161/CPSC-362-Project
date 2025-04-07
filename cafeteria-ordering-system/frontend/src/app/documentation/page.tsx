// app/documentation/page.tsx
"use client";

export default function DocumentationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-lg leading-relaxed">
      <h1 className="text-5xl font-extrabold mb-10 text-center">📘 User Documentation</h1>

      {/* Getting Started */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🔑 Getting Started</h2>
        <p>Welcome to the CSUF Cafeteria System! To begin using the platform:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Create an account or log in.</li>
          <li>Select your role: Customer or Employee.</li>
          <li>Navigate using the menu at the top.</li>
        </ul>
      </section>

      {/* Placing Orders */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🛒 Placing Orders</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Browse food options on the Dashboard.</li>
          <li>Add desired items to your cart.</li>
          <li>View your cart and click “Checkout”.</li>
          <li>Confirm your order and wait for updates.</li>
        </ul>
      </section>

      {/* Tracking Orders */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📦 Tracking Orders</h2>
        <p>
          After placing your order, head over to the <strong>Confirmation</strong> page to see real-time tracking. Your status will update automatically:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Preparing</li>
          <li>Ready for Pickup</li>
          <li>Out for Delivery</li>
          <li>Delivered</li>
        </ul>
      </section>

      {/* Account Settings */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">⚙️ Managing Your Account</h2>
        <p>You can manage your account by:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Clicking the user icon in the top-right corner.</li>
          <li>Updating your email, password, or role.</li>
          <li>Viewing your order history.</li>
        </ul>
      </section>

      {/* Employee Features */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">👩‍🍳 Employee Features</h2>
        <p>Employees have access to special tools for order handling:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>View incoming orders and update their status.</li>
          <li>Mark orders as “Ready” or “Completed”.</li>
          <li>Assign orders to delivery personnel.</li>
        </ul>
      </section>

      {/* Help / FAQ */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Q:</strong> I forgot my password. What do I do?<br /><strong>A:</strong> Use the “Forgot Password” link on the login page.</li>
          <li><strong>Q:</strong> My order never arrived!<br /><strong>A:</strong> Contact support via your Account page or footer link.</li>
          <li><strong>Q:</strong> I want to switch from Customer to Employee.<br /><strong>A:</strong> You can change roles in your account settings.</li>
        </ul>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">💬 Need More Help?</h2>
        <p>
          Reach out through the “Help” link in the footer, or email us directly at <strong>support@cafecsuf.com</strong>.
        </p>
      </section>
    </div>
  );
}