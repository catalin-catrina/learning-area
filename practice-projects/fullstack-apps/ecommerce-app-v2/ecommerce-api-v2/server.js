const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;
const SPA_ORIGIN = "http://localhost:4200";

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser());
app.use(
  cors({
    origin: SPA_ORIGIN,
    credentials: true,
  })
); // for CORS so browser is allowed to send and receive cookies with our API

const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const ordersRoute = require("./routes/orders");
const authRoute = require("./routes/auth");

app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/auth", authRoute);
app.use(errorHandler);

// Simple health-check route
app.get("/", (req, res) => {
  res.send("Welcome to our e-commerce API!");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
