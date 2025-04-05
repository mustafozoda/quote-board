import { Router } from "express";
import {
  askQuestion,
  getByToken,
  deferAnswer,
  answerQuestion,
} from "../controllers/question.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(askQuestion));
router.get("/by-token/:token", asyncHandler(getByToken));
router.post("/defer", asyncHandler(deferAnswer));
router.get("/defer", asyncHandler(deferAnswer));
router.post("/answer", asyncHandler(answerQuestion));

export default router;
