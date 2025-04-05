import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index";
import AnswerQuestionPage from "../src/components/AnswerQuestionPage";
import DeferredPage from "./components/DeferredPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/answer" element={<AnswerQuestionPage />} />
        <Route path="/questions/deferred" element={<DeferredPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
