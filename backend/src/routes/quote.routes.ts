import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as quoteController from "../controllers/quote.controller";

const router = Router();

router.get("/", asyncHandler(quoteController.getQuotes));
router.post("/", asyncHandler(quoteController.createQuote));
router.delete("/:id", asyncHandler(quoteController.deleteQuote));
export default router;
