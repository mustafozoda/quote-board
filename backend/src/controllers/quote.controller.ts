import { Request, Response } from "express";
import * as quoteService from "../services/quote.service";

export const getQuotes = async (req: Request, res: Response) => {
  const quotes = await quoteService.getAllQuotes();
  res.status(200).json(quotes);
};

export const createQuote = async (req: Request, res: Response) => {
  const { author, text } = req.body;

  if (!author || !text) {
    res.status(400);
    throw new Error("Author and text are required.");
  }

  const newQuote = await quoteService.createQuote({ author, text });
  res.status(201).json(newQuote);
};
