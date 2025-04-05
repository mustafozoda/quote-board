import { Router } from "express";
import asyncHandler from "express-async-handler";
import { getQuotes, createQuote } from "../controllers/quote.controller";

const router = Router();

router.get("/", asyncHandler(getQuotes));
router.post("/", asyncHandler(createQuote));

export default router;
