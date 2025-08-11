import { useState, useEffect } from "react";
import shapeTr from "./assets/shape_tr.png";
import shapeBl from "./assets/shape_bl.png";
import QuestionsPage from "./QuestionsPage";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setData(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    if (isStarted) {
      fetchData();
    }
  }, [isStarted]);

  return (
    <main>
      <img src={shapeTr} alt="Shape top right" className="shape-top" />
      <div className="content-container">
        {!isStarted ? (
          <div className="start-page">
            <h1>Quizzical</h1>
            <p>Test your knowledge with fun trivia questions!</p>
            <button onClick={() => setIsStarted(true)}>Start quiz</button>
          </div>
        ) : (
          <QuestionsPage data={data} />
        )}
      </div>
      <img src={shapeBl} alt="Shape bottom left" className="shape-bottom" />
    </main>
  );
}
