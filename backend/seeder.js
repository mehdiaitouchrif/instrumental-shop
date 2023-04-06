const fs = require("fs");
const User = require("./models/User");
const Collection = require("./models/Collection");
const Product = require("./models/Product");
const Order = require("./models/Order");

// Load env
require("dotenv").config();

// Connect to db
require("./database/db")();

// Read JSON data
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/__data__/users.json`, "utf-8")
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/__data__/products.json`, "utf-8")
);
const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/__data__/orders.json`, "utf-8")
);
const collections = JSON.parse(
  fs.readFileSync(`${__dirname}/__data__/collections.json`, "utf-8")
);

// Populate database
const importData = async () => {
  try {
    await User.insertMany(users);
    await Collection.insertMany(collections);
    await Product.insertMany(products);
    await Order.insertMany(orders);
    console.log("DATA IMPORTED!!");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

// Destroy database
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Collection.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("DATA DESTROYED!!");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
