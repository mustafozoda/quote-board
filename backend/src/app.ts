import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quoteRoutes from "./routes/quote.routes";
import questionRoutes from "./routes/question.routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quotes", quoteRoutes);
app.use("/questions", questionRoutes);

export default app;
