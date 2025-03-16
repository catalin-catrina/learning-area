const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Importing our products route
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');

// Connecting the products route under the /api/products path
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);

// Simple health-check route
app.get('/', (req, res) => {
  res.send('Welcome to our e-commerce API!');
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
