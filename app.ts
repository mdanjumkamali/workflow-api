import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./client/db";

import authRoute from "./routes/auth/auth.route";
import taskRoute from "./routes/task/task.route";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:3000",
  "https://task-treke.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(null, false); // Just deny the origin, no error
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight (OPTIONS) requests
app.options("*", cors());

// Global error handler (optional, but recommended)
app.use((err, req, res, next) => {
  if (err.name === "CorsError") {
    return res.status(403).json({ error: "CORS policy does not allow this origin" });
  }
  next(err);
});

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
