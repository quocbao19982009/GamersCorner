import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// To get the a sercert file for your token or url use dotenv

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// This morgan help to log when every something hit the code

app.use(express.json());
// This mean that this server accept JSON Format

// Res.send (respone.send) -> Send to path "/"

app.use("/api/products", productRoutes);
// anything go to /api/product will got next to productRoutres

app.use("/api/users/", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runing...");
  });
}

app.use(notFound);

// error Handler if /api/products/id which is not in the form of _id
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
