const express = require("express");
const dotenv = require("dotenv");

// init app
const app = express();

// load vars
dotenv.config();

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
