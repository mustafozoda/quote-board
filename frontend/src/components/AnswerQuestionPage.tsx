import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useState } from "react";

export default function AnswerQuestionPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [answer, setAnswer] = useState("");

  const {
    data: question,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["question", token],
    enabled: !!token,
    queryFn: async () => {
      const res = await api.get(`/questions/by-token/${token}`);
      return res.data;
    },
  });

  const {
    mutate,
    isSuccess: sent,
    isError: submitError,
  } = useMutation({
    mutationFn: async () => {
      return api.post(`/questions/answer?token=${token}`, { answer });
    },
  });

  const submitAnswer = () => {
    if (!answer || !token) return;
    mutate();
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 md:px-8 animate-fadeIn">
      <div className="bg-white shadow-smooth rounded-xl p-6 sm:p-8 space-y-6">
        {children}
      </div>
    </div>
  );

  if (isLoading)
    return (
      <Wrapper>
        <p className="text-center text-muted text-lg">Loading question...</p>
      </Wrapper>
    );

  if (isError || !question)
    return (
      <Wrapper>
        <p className="text-center text-red-500 text-lg">
          Invalid or expired link.
        </p>
      </Wrapper>
    );

  if (sent)
    return (
      <Wrapper>
        <p className="text-center text-green-600 text-lg">
          ✅ Your answer has been sent. Thank you!
        </p>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
        Answer This Question
      </h2>

      <div className="text-muted text-sm sm:text-base space-y-2">
        <p>
          From: <strong>{question.name}</strong> ({question.email})
        </p>
        <p>
          ❓ <strong>Question:</strong>
        </p>
        <blockquote className="bg-background border border-muted rounded-lg p-4 text-sm sm:text-base">
          {question.question}
        </blockquote>
      </div>

      <textarea
        className="w-full mt-4 p-3 border border-muted rounded-lg focus:outline-none focus:ring focus:ring-primary/40 transition"
        rows={6}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-4">
        <button
          onClick={submitAnswer}
          className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-soft"
        >
          Send Answer
        </button>
        {submitError && (
          <p className="text-sm text-red-500 text-center sm:text-left">
            ❌ Failed to submit your answer.
          </p>
        )}
      </div>
    </Wrapper>
  );
}
