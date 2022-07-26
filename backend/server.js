import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import colors from "colors";
import connectDB from "./config/db.js";
import productsRoute from "./routes/productRouts.js";
import userRoutes from './routes/userRouts.js'
dotenv.config();
// Middleware
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running.......");
});

// All Routes

app.use("/api/products", productsRoute);
app.use("/api/users",userRoutes)
const PORT = process.env.PORT || 500;

app.listen(
  PORT,
  console.log(
    `Server is active is ${process.env.NODE_ENV}  mode on port ${PORT}`.green
      .bold
  )
);
