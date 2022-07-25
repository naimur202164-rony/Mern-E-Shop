import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import colors from "colors";

dotenv.config();
// Middleware

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running.......");
});

const PORT = process.env.PORT || 500;

app.listen(
  PORT,
  console.log(
    `Server is active is ${process.env.NODE_ENV}  mode on port ${PORT}`.green
      .bold
  )
);
