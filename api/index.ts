import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import testRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

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