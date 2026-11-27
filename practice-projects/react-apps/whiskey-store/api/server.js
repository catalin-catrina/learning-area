require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const { port, clientUrls } = require("./config/env");

const app = express();
// Behind Render's (and Vercel's) proxy: trust the first hop so req.ip is the
// visitor's address, not the proxy's (used in the auth logs).
app.set("trust proxy", 1);

// Webhook: preserve the body for signature verification by putting it before app.use(express.json());
const stripeRoute = require("./routes/stripe");
app.use("/api/stripe", stripeRoute);

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser());
app.use(
  cors({
    origin: clientUrls,
    credentials: true,
  }),
); // Only needed when the browser calls the API on another origin (local dev:
// 5173 → 3000). In production Vercel proxies /api, so requests are same-origin.

// Health check for uptime pings: answers without touching the database, so
// pinging it doesn't keep the database awake.
app.get("/api/health", (req, res) => res.json({ ok: true }));

const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const ordersRoute = require("./routes/orders");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const favoritesRoute = require("./routes/favorites");
const addressesRoute = require("./routes/addresses");

app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/favorites", favoritesRoute);
app.use("/api/addresses", addressesRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/auth", authRoute);
app.use(errorHandler);

// Simple health-check route
app.get("/", (req, res) => {
  res.send("Welcome to our e-commerce API!");
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
