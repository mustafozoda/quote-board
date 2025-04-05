import QuoteForm from "../../components/QuoteForm";
import QuoteList from "../../components/QuoteList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 drop-shadow">
          📜 Welcome to the Quote Board
        </h1>
        <QuoteForm />
        <QuoteList />
      </div>
    </div>
  );
};
export default Home;
