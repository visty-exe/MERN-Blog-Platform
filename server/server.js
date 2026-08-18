import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import router from "./routes/route.js";

const app = express();

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-blog-platform-hisp-cyan.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});