import { useState } from "react";
import api from "../services/api";

type Props = {
  onClose: () => void;
};

export default function AskFormModal({ onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    question: "",
  });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/questions", {
        ...form,
        destination: "mustaffozode@gmail.com",
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white w-full sm:max-w-lg rounded-2xl shadow-glass p-6 sm:p-8 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-indigo-600 mb-4 text-center">
          💬 Ask a Question
        </h2>

        {status === "sent" ? (
          <div className="text-green-600 text-center text-base sm:text-lg font-medium">
            ✅ Question sent successfully!
          </div>
        ) : (
          <>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-muted rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-muted rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
            <textarea
              name="question"
              placeholder="Your question..."
              value={form.question}
              onChange={handleChange}
              rows={4}
              className="w-full mb-3 p-3 border border-muted rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200 shadow-soft text-sm sm:text-base"
            >
              Send Question
            </button>
            {status === "error" && (
              <p className="text-red-500 mt-3 text-sm text-center">
                ❌ Failed to send. Try again.
              </p>
            )}
          </>
        )}

        <button
          onClick={onClose}
          className="text-sm text-gray-500 mt-6 underline block mx-auto hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
