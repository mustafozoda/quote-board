import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendMail } from "../utils/mailer";

const prisma = new PrismaClient();

export const QuestionService = {
  async create({ name, email, question, destination }: any) {
    const token = crypto.randomBytes(32).toString("hex");
    const saved = await prisma.question.create({
      data: { name, email, question, destination, answerToken: token },
    });

    const answerLink = `${process.env.FRONTEND_URL}/questions/answer?token=${token}`;
    const deferLink = `${process.env.BACKEND_URL}/questions/defer?token=${token}`;

    const html = `
      <div style="font-family:sans-serif;">
        <h2>You’ve received a question</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <blockquote>${question}</blockquote>
        <a href="${answerLink}">✅ Answer</a> |
        <a href="${deferLink}">💤 Answer Later</a>
      </div>
    `;

    await sendMail(destination, "New Question Received", html);
    return saved;
  },

  async getByToken(token: string) {
    return prisma.question.findUnique({ where: { answerToken: token } });
  },

  async deferAnswer(token: string) {
    return prisma.question.update({
      where: { answerToken: token },
      data: { status: "LATER" },
    });
  },

  async submitAnswer(token: string, answer: string) {
    console.log("🛠 Submitting answer for token:", token);

    let updated;
    try {
      updated = await prisma.question.update({
        where: { answerToken: token },
        data: { answer, status: "ANSWERED" },
      });
    } catch (err: any) {
      console.error("❌ Failed to update DB:", err);

      if (err.code === "P2025") {
        // Prisma error: record not found
        throw new Error("Invalid or expired token.");
      }

      throw new Error("DB update failed.");
    }

    const html = `
    <h2>Your Question Was Answered</h2>
    <p><strong>Your Question:</strong></p>
    <blockquote>${updated.question}</blockquote>
    <p><strong>Answer:</strong></p>
    <blockquote>${answer}</blockquote>
  `;

    try {
      await sendMail(updated.email, "Answer to Your Question", html);
    } catch (err) {
      console.error("✉️ Email sending failed:", err);
      // Optional: Don't throw here, just log
    }

    return updated;
  },
};
