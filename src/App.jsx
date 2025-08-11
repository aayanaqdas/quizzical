import { useState, useEffect } from "react";
import shapeTr from "./assets/shape_tr.png";
import shapeBl from "./assets/shape_bl.png";
import QuestionsPage from "./QuestionsPage";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [triviaOptions, setTriviaOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = `https://opentdb.com/api.php?amount=${triviaOptions.amount}&category=${triviaOptions.category}&difficulty=${triviaOptions.difficulty}&type=${triviaOptions.type}`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setData(data.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (isStarted) {
      fetchData();
    }
  }, [isStarted, triviaOptions]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        localStorage.setItem("categories", JSON.stringify(data.trivia_categories));
        setCategories(data.trivia_categories);
      } catch (error) {
        console.log(error);
      }
    };
    if (localStorage.getItem("categories")) {
      setCategories(JSON.parse(localStorage.getItem("categories")));
    } else {
      fetchCategories();
    }
  }, []);

  const categoryOptions = categories.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  function handleForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = formData.get("category");
    const difficulty = formData.get("difficulty");
    const type = formData.get("type");
    const amount = formData.get("amount");

    const options = {
      category: category,
      difficulty: difficulty,
      type: type,
      amount: amount,
    };
    setTriviaOptions(options);
    setIsStarted(true);
  }

  return (
    <main>
      <img src={shapeTr} alt="Shape top right" className="shape-top" />
      <div className="content-container">
        {!isStarted ? (
          <form onSubmit={handleForm} className="start-page">
            <h1>Quizzical</h1>
            <p>Test your knowledge with fun trivia questions!</p>
            <section className="trivia-options-container">
              <div className="questions-categor trivia-option">
                <label htmlFor="category">Category: </label>
                <select name="category" id="category">
                  <option value="">Any category</option>
                  {categoryOptions}
                </select>
              </div>

              <div className="questions-difficulty trivia-option">
                <label htmlFor="difficulty">Difficulty: </label>
                <select name="difficulty" id="difficulty">
                  <option value="">Any difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="questions-type trivia-option">
                <label htmlFor="type">Type: </label>
                <select name="type" id="type">
                  <option value="">Any type</option>
                  <option value="multiple">Multiple choice</option>
                  <option value="boolean">True/False</option>
                </select>
              </div>
              <div className="questions-amount trivia-option">
                <label htmlFor="amount">Questions: </label>
                <input id="amount" name="amount" type="number" min="1" max="50" defaultValue="5" />
              </div>
            </section>
            <button type="submit">Start quiz</button>
          </form>
        ) : loading ? (
          <div className="quiz-loading">Loading...</div>
        ) : (
          <QuestionsPage data={data} setIsStarted={setIsStarted} />
        )}
      </div>
      <img src={shapeBl} alt="Shape bottom left" className="shape-bottom" />
    </main>
  );
}
