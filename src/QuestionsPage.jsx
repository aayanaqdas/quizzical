import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function QuestionsPage(props) {
  const { data, setIsStarted } = props;
  const [isGameOver, setIsGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    const shuffled = data.map((question) => {
      const answers = [...question.incorrect_answers, question.correct_answer];
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return { ...question, shuffledAnswers: answers };
    });
    setShuffledData(shuffled);
    setUserAnswers({});
    setIsGameOver(false);
  }, [data]);

  function handleChange(event, index) {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: event.target.value,
    }));
  }

  const quizElements = shuffledData.map((question, index) => {
    const optionsElements = question.shuffledAnswers.map((answer) => {
      const option = decode(answer);
      const optionId = nanoid();

      let labelClass = "";
      if (isGameOver) {
        if (option === decode(question.correct_answer)) {
          labelClass = "correct";
        } else if (userAnswers[index] === option && option !== decode(question.correct_answer)) {
          labelClass = "incorrect";
        }
      }

      return (
        <div key={optionId}>
          <input
            type="radio"
            id={optionId}
            name={`question-${index}`}
            value={option}
            checked={userAnswers[index] === option}
            onChange={(event) => handleChange(event, index)}
            required
            disabled={isGameOver}
          />
          <label className={labelClass} htmlFor={optionId}>
            {option}
          </label>
        </div>
      );
    });
    return (
      <section className="question-wrapper" key={index}>
        <h2 className="question-text">{decode(question.question)}</h2>
        <div className="radio-button-group">{optionsElements}</div>
      </section>
    );
  });

  function checkAnswers() {
    let correct = 0;
    shuffledData.map((question, index) => {
      if (userAnswers[index] === decode(question.correct_answer)) {
        correct += 1;
      }
    });
    return correct;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsGameOver(true);
  }

  function handleRestart() {
    setIsGameOver(false);
    setUserAnswers({});
    setIsStarted(false);
  }

  const score = checkAnswers();
  const allAnswered = Object.keys(userAnswers).length === shuffledData.length;

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      {shuffledData.length === 0 ? (
        <div className="no-results">
          <p>No quiz available for selected options</p>
          <button onClick={handleRestart}>Try again</button>
        </div>
      ) : (
        <>
          {quizElements}
          <div className="quiz-result-container">
            {isGameOver ? (
              <>
                <h3>
                  You scored {score}/{shuffledData.length} correct answers
                </h3>
                <button onClick={handleRestart}>Play again</button>
              </>
            ) : (
              <button type="submit" disabled={!allAnswered}>
                Check answers
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}
