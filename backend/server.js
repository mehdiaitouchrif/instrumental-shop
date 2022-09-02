const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

// init app
const app = express();

// load vars
dotenv.config();

// connect to mongo
connectDB();

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
