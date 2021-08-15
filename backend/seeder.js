import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clears all data from the database to prevent duplication
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Creates array of all users added
    const createdUsers = await User.insertMany(users);

    // Gets the first user from the array of users added which is our adminUser
    const adminUser = createdUsers[0]._id;

    // Loops over products and adds the adminUser as the user who created the products
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Destroys all data in the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// This will check the value of the tag passed in when calling it in the command line
// If it's called with -d it will destroy data if its not it will importData()
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
