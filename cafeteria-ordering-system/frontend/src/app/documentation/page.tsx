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
          <li>Select your role: Customer or Employee.</li>
          <li>Navigate using the primary navigation menu at the top.</li>
        </ul>
      </section>

      {/* Menu Navigation */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🍽️ Menu Navigation</h2>
        <p>Our system provides access to both campus cafeteria options and local restaurant partners:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Toggle View:</strong> Switch between "Cafeteria" and "Local Restaurants" using the selector at the top of the menu page.</li>
          <li><strong>Categories:</strong> Filter items by food category (Breakfast, Lunch, Dinner, Snacks).</li>
          <li><strong>Search:</strong> Use the search bar to find specific dishes or ingredients.</li>
          <li><strong>Dietary Filters:</strong> Apply filters for dietary preferences (Vegetarian, Vegan, Gluten-Free).</li>
        </ul>
      </section>

      {/* Placing Orders */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🛒 Placing Orders</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Browse food options on the Dashboard.</li>
          <li>Click on an item to view details, nutritional information, and customization options.</li>
          <li>Add desired items to your cart. Customize as needed.</li>
          <li>View your cart and click "Checkout".</li>
          <li>Select delivery location (building/room) or pickup option.</li>
          <li>Confirm your order and proceed to payment.</li>
        </ul>
      </section>

      {/* Payment Methods */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">💳 Payment Methods</h2>
        <p>The system supports multiple payment options:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Student Meal Plan:</strong> Apply your meal plan credits directly.</li>
          <li><strong>Credit/Debit Cards:</strong> Securely stored for quick checkout.</li>
          <li><strong>Campus Cash:</strong> Use your CSUF Campus Cash balance.</li>
          <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay, and other supported services.</li>
        </ul>
        <p className="mt-2">After payment processing, you'll receive a digital receipt via email and in your order history.</p>
      </section>

      {/* Tracking Orders */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📦 Tracking Orders</h2>
        <p>
          After placing your order, navigate to the <strong>Order Tracking</strong> page to see real-time updates. Your status will update automatically with toast notifications appearing when status changes:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Pending:</strong> Order received, awaiting confirmation</li>
          <li><strong>Preparing:</strong> Food preparation in progress</li>
          <li><strong>Out for Delivery:</strong> Order en route (for delivery orders)</li>
          <li><strong>Ready for Pickup:</strong> Available at selected location (for pickup orders)</li>
          <li><strong>Completed:</strong> Order delivered or picked up</li>
        </ul>
      </section>

      {/* Order History */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📜 Order History & Reordering</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Access your complete order history from your Account page.</li>
          <li>Click "View Details" on any past order to see full information.</li>
          <li>Use "Reorder" to quickly add all items from a past order to your cart.</li>
          <li>Click the star icon to mark favorite orders for quick access.</li>
          <li>Filter history by date range, restaurant, or order status.</li>
        </ul>
      </section>

      {/* Delivery & Pickup */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">🚚 Delivery & Pickup</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Campus Delivery:</strong> Select your building and room number from the dropdown menu.</li>
          <li><strong>Delivery Windows:</strong> Choose from available time slots based on current capacity.</li>
          <li><strong>Pickup Locations:</strong> Each vendor has designated pickup spots shown on the campus map.</li>
          <li><strong>Estimated Times:</strong> System calculates and displays ETA based on order volume and distance.</li>
        </ul>
      </section>

      {/* Account Settings */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">⚙️ Managing Your Account</h2>
        <p>You can manage your account by:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Clicking the user icon in the top-right corner.</li>
          <li>Updating your contact information, password, or role.</li>
          <li>Managing saved payment methods.</li>
          <li>Setting default delivery locations.</li>
          <li>Configuring notification preferences.</li>
          <li>Viewing your complete order history.</li>
        </ul>
      </section>

      {/* Ratings & Feedback */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">⭐ Ratings & Feedback</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Rate your orders after completion in the Order History section.</li>
          <li>Provide detailed feedback about food quality, service, and delivery.</li>
          <li>View average ratings for menu items before ordering.</li>
          <li>Report specific issues through the feedback form.</li>
        </ul>
      </section>

      {/* Employee Features */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">👩‍🍳 Employee Features</h2>
        <p>Employees have access to special tools for order handling:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>View incoming orders in the Order Queue interface.</li>
          <li>Update order status through the processing workflow.</li>
          <li>Mark orders as "Ready" or "Completed".</li>
          <li>Assign orders to delivery personnel from the dispatch board.</li>
          <li>Access restaurant-specific inventory management.</li>
          <li>Generate end-of-day reports and analytics.</li>
        </ul>
      </section>

      {/* Mobile Experience */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">📱 Mobile Experience</h2>
        <p>The CSUF Cafeteria System is fully responsive and optimized for mobile devices:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Swipe navigation for browsing menu categories.</li>
          <li>Push notifications for order status updates.</li>
          <li>Location services integration for faster delivery.</li>
          <li>Optimized touch interfaces for all core functions.</li>
          <li>Offline menu browsing capability.</li>
        </ul>
      </section>

      {/* Help / FAQ */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Q:</strong> I forgot my password. What do I do?<br /><strong>A:</strong> Use the "Forgot Password" link on the login page.</li>
          <li><strong>Q:</strong> My order never arrived!<br /><strong>A:</strong> Check your order status in the tracking page. If marked as delivered, contact support immediately.</li>
          <li><strong>Q:</strong> Can I combine items from different restaurants?<br /><strong>A:</strong> Yes, but they may arrive at different times and have separate delivery fees.</li>
          <li><strong>Q:</strong> How do I apply my meal plan credits?<br /><strong>A:</strong> Select "Meal Plan" on the payment page and verify your student ID.</li>
          <li><strong>Q:</strong> I want to switch from Customer to Employee.<br /><strong>A:</strong> You need manager approval. Request this change in your account settings.</li>
        </ul>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">💬 Need More Help?</h2>
        <p>
          Reach out through the "Help" link in the footer, or email us directly at <strong>support@cafecsuf.com</strong>.
        </p>
        <p className="mt-2">
          For urgent assistance with active orders, call our support line at (555) 123-4567 during operating hours (7:00 AM - 9:00 PM).
        </p>
      </section>
    </div>
  );
}