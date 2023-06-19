const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimiter = require("express-rate-limit");
const connectDB = require("./database/db");
const errorHandler = require("./middleware/error");

// init app
const app = express();

// load vars
dotenv.config();

// connect to mongo
connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "https://res.cloudinary.com"],
      "frame-src": ["'self'", "https://giphy.com/"],
    },
  })
);
// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 200,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("Hello World");
});

// Mount routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/collections", require("./routes/collections"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/uploads", require("./routes/uploads"));

app.get("/api/config/paypal", (req, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID);
});

// Load React build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}
// Error middelware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
