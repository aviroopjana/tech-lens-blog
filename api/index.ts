import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import testRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING + '&ssl=true')
  .then(() => {
    console.log("MongoDB database is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

app.use('/api/user', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(( err, req, res, next) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})