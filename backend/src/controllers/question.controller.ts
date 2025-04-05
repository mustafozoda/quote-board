import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";
import { sendMail } from "../utils/mailer";
export const askQuestion = async (req: Request, res: Response) => {
  const { name, email, question, destination } = req.body;
  const result = await QuestionService.create({
    name,
    email,
    question,
    destination,
  });
  res.status(201).json(result);
};

export const getByToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  const question = await QuestionService.getByToken(token);
  if (!question) return res.status(404).send("Not found");
  res.json(question);
};

export const deferAnswer = async (req: Request, res: Response) => {
  const { token } = req.query;

  console.log("📥 Defer request received for token:", token);
  if (!token) return res.status(400).send("Missing token");

  const deferred = await QuestionService.deferAnswer(token as string);
  console.log("✅ Question marked as LATER");

  // Send email back to the original sender
  const html = `
    <h2>We Received Your Question</h2>
    <p>Hi <strong>${deferred.name}</strong>,</p>
    <p>Your question has been marked for later. Someone will get back to you soon!</p>
    <blockquote>${deferred.question}</blockquote>
    <p>Thanks for your patience 🙏</p>
  `;

  try {
    await sendMail(deferred.email, "We’ll Get Back to You Soon", html);
    console.log("📧 Defer notification sent to asker");
  } catch (err) {
    console.error("❌ Failed to send defer email:", err);
    // Don't block the user, still continue
  }

  res.redirect(`${process.env.FRONTEND_URL}/questions/deferred`);
};

export const answerQuestion = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { answer } = req.body;

  console.log("➡️ Received answer submission");
  console.log("Token:", token);
  console.log("Answer:", answer);

  if (!token || !answer) {
    return res.status(400).json({ error: "Missing token or answer" });
  }

  const updated = await QuestionService.submitAnswer(token as string, answer);
  res.json(updated);
};
