const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
app.use(cors());


// Dummy order status for testing
let currentStatus = 'Pending';

app.get('/orderstatus', (req, res) => {
  res.json({ status: currentStatus }); // <- This is your JSON response!
});

// You can manually change the status to simulate progress
setInterval(() => {
  const statuses = ['Pending', 'Preparing', 'Out for Delivery', 'Completed'];
  const currentIndex = statuses.indexOf(currentStatus);
  if (currentIndex < statuses.length - 1) {
    currentStatus = statuses[currentIndex + 1];
  }
}, 30000); // Change every 30 seconds

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
