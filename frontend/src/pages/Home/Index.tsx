import QuoteForm from "../../components/QuoteForm";
import QuoteList from "../../components/QuoteList";

import { useState } from "react";
import AskFormModal from "../../components/AskFormModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl animate-fadeIn mx-auto space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 drop-shadow">
            📜 Welcome to the Quote Board
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Share your thoughts, words of wisdom, or favorite lines.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            💬 Ask Me a Question
          </button>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            ✍️ Add a Quote
          </h2>
          <QuoteForm />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            📝 Recent Quotes
          </h2>
          <QuoteList />
        </section>

        <p className="text-sm text-gray-500 italic">
          ⚠️ Heads up! This app is hosted on free-tier services (Vercel, Render,
          Neon). It might take a few seconds to wake up. Thanks for your
          patience!
        </p>
      </div>

      {showModal && <AskFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
