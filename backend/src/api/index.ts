import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quoteRoutes from "../routes/quote.routes";
import questionRoutes from "../routes/question.routes";
import serverless from "serverless-http";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// This is a test endpoint to check if the serverless function is working
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel Serverless!" });
});

app.use("/quotes", quoteRoutes);
app.use("/questions", questionRoutes);

module.exports = serverless(app);
