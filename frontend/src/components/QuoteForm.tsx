import { useState } from "react";
import { useCreateQuote } from "../hooks/useQuotes";

const QuoteForm = () => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const mutation = useCreateQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    mutation.mutate(
      { author, text },
      {
        onSuccess: () => {
          setAuthor("");
          setText("");
          console.log("Quote posted successfully!");
        },
      }
    );
  };

  const isLoading = mutation.status === "pending";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg p-6 rounded-2xl transition-all"
    >
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <textarea
        placeholder="Your quote..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        rows={3}
      />
      <button
        type="submit"
        className={`w-full bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Posting..." : "Submit Quote"}
      </button>
    </form>
  );
};

export default QuoteForm;
