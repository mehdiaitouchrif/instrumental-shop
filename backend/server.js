const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./database/db");
const errorHandler = require("./middleware/error");

// init app
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// load vars
dotenv.config();

// connect to mongo
connectDB();

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

// Error middelware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
