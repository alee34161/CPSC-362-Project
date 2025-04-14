const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(cors());
app.use(express.json()); // To handle POST/PUT requests with body

// 🛒 Dummy cart items
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



// 🌟 Loyalty system
const loyaltyData = {
  points: 26,
  history: [
    {
      orderId: 101,
      amountSpent: 21.48,
      pointsEarned: 21,
      timestamp: pastOrders[0].timestamp
    },
    {
      orderId: 102,
      amountSpent: 4.99,
      pointsEarned: 5,
      timestamp: pastOrders[1].timestamp
    }
  ]
};

// 🚚 Order status simulator
let currentStatus = 'Pending';
const statusStages = ['Pending', 'Preparing', 'Out for Delivery', 'Completed'];

// Auto-progress order status every 30 seconds
setInterval(() => {
  const currentIndex = statusStages.indexOf(currentStatus);
  if (currentIndex < statusStages.length - 1) {
    currentStatus = statusStages[currentIndex + 1];
    console.log(`Status updated to: ${currentStatus}`);
  }
}, 30000);

// 📡 API Routes

app.get('/loyalty', (req, res) => {
  res.json(loyaltyData);
});

app.get('/orderstatus', (req, res) => {
  res.json({ status: currentStatus });
});

app.get('/cartread', (req, res) => {
  res.json(dummyCartItems);
});

// 🎁 Redeem 50 points for $5 off
app.post('/redeem', (req, res) => {
  if (loyaltyData.points >= 50) {
    loyaltyData.points -= 50;
    res.json({ success: true, message: 'Redeemed 50 points for $5 off!' });
  } else {
    res.status(400).json({
      success: false,
      message: `Not enough points. You need ${50 - loyaltyData.points} more.`
    });
  }
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('- GET  /orderstatus  -> Returns current order status');
  console.log('- GET  /cartread     -> Returns dummy cart items');
  console.log('- GET  /loyalty      -> Returns loyalty info');
  console.log('- GET  /pastorders   -> Returns past order data');
  console.log('- POST /redeem       -> Redeem loyalty points');
});
