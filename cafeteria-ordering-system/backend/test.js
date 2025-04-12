const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
app.use(cors());

// Dummy order status for testing
let currentStatus = 'Pending';

// Dummy cart items array
const dummyCartItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    price: 8.99,
    quantity: 2,
    image: "/placeholder-food.jpg",
    customization: "No onions"
  },
  {
    id: 2,
    name: "French Fries",
    price: 3.50,
    quantity: 1,
    image: "/placeholder-food.jpg",
    customization: ""
  },
  {
    id: 3,
    name: "Chocolate Milkshake",
    price: 4.99,
    quantity: 1,
    image: "/placeholder-food.jpg",
    customization: "Extra whipped cream"
  }
];

// Order status endpoint
app.get('/orderstatus', (req, res) => {
  res.json({ status: currentStatus });
});

// Cart data endpoint
app.get('/cartread', (req, res) => {
  // Return the dummy cart data as JSON
  res.json(dummyCartItems);
});

// Status progression simulation
setInterval(() => {
  const statuses = ['Pending', 'Preparing', 'Out for Delivery', 'Completed'];
  const currentIndex = statuses.indexOf(currentStatus);
  
  // Advance to next status if not at the end
  if (currentIndex < statuses.length - 1) {
    currentStatus = statuses[currentIndex + 1];
    console.log(`Status updated to: ${currentStatus}`);
  }
}, 30000); // Change every 30 seconds

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`- GET /orderstatus -> Returns current order status`);
  console.log(`- GET /cartread -> Returns dummy cart items`);
});