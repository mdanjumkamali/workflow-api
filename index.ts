import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./client/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
