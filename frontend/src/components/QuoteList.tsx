import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { useQuotes } from "../hooks/useQuotes";
import { useDeleteQuote } from "../hooks/useQuotes";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

const QuoteList = () => {
  const mutation = useDeleteQuote();
  const { data, isLoading, error } = useQuotes();
  const firstItemRef = useRef<HTMLDivElement>(null);

  const handleDelete = (quoteId: string) => {
    mutation.mutate(quoteId, {
      onSuccess: () => console.log("Quote deleted successfully!"),
      onError: () => console.error("Failed to delete quote."),
    });
  };

  useEffect(() => {
    const el = firstItemRef.current;
    if (!el) return;

    setTimeout(() => {
      el.style.transition = "transform 0.7s ease";
      el.style.transform = "translateX(-60px)";

      setTimeout(() => {
        el.style.transform = "translateX(0)";
      }, 600);
    }, 500);
  }, [data]);

  const trailingActions = (quoteId: string) => (
    <TrailingActions>
      <SwipeAction destructive onClick={() => handleDelete(quoteId)}>
        <div className="flex items-center justify-center rounded-[5px] bg-red-500 text-white px-4">
          <Trash2 className="w-6 h-6" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load quotes.</p>;

  return (
    <div className="max-w-3xl mx-auto sm:px-6 lg:px-0 py-8">
      <SwipeableList threshold={0.9} type={Type.IOS}>
        {data?.map((quote, index) => (
          <SwipeableListItem
            key={quote.id}
            trailingActions={trailingActions(quote.id)}
          >
            <div
              ref={index === 0 ? firstItemRef : null}
              className="bg-light m-2 border animate-fadeIn w-full border-gray-200 shadow-soft rounded-[15px] p-[10px] transition-all duration-300"
            >
              <p className="text-lg sm:text-xl font-medium text-dark italic leading-relaxed mb-3">
                "{quote.text}"
              </p>
              <p className="text-sm sm:text-base text-muted text-right">
                — {quote.author}
              </p>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default QuoteList;
