const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${response.connection.host}`);
  } catch (error) {
    console.log("Mongo connection error: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
