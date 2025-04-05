import { useQuotes } from "../hooks/useQuotes";

const QuoteList = () => {
  const { data, isLoading, error } = useQuotes();

  if (isLoading) return <p className="text-center">Loading quotes...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load quotes.</p>;

  return (
    <div className="space-y-6">
      {data?.map((quote) => (
        <div
          key={quote.id}
          className="p-5 bg-white/70 border border-gray-200 backdrop-blur rounded-xl shadow hover:shadow-md transition"
        >
          <p className="text-xl text-gray-800 italic leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-sm text-right text-gray-600 mt-2 font-medium">
            — {quote.author}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuoteList;
