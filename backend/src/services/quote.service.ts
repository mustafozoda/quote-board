import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllQuotes = async () => {
  return await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
  });
};

type CreateQuoteInput = {
  author: string;
  text: string;
};

export const createQuote = async (input: CreateQuoteInput) => {
  return await prisma.quote.create({
    data: {
      author: input.author,
      text: input.text,
      userId: "guest",
    },
  });
};
