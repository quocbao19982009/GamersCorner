import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async function () {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // wipe everything out before adding new data

    const createdUsers = await User.insertMany(users);
    const admin = createdUsers.find((user) => user.isAdmin);
    const adminId = admin._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminId };
    });
    // This make the product has the userId (user that create it)
    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
    // exit with error
  }
};

const destroyData = async function () {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // wipe everything out before adding new data
    console.log("Data destroy".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
    // exit with error
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
