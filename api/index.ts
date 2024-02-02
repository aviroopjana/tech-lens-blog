import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import testRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

app.use('/api/user', testRoute);
app.use('/api/auth', authRoute);

app.use(( err, req, res, next) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})