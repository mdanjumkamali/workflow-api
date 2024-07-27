import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./client/db";

import authRoute from "./routes/auth/auth.route";
import taskRoute from "./routes/task/task.route";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
