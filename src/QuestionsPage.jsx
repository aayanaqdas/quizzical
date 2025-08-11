import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function QuestionsPage(props) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [shuffledData, setShuffledData] = useState([]);
  useEffect(() => {
    const shuffled = props.data.map((question) => {
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
  }, [props.data]);

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
          <label htmlFor={optionId}>{option}</label>
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
      console.log(question.correct_answer);
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
    props.setIsStarted((prev) => !prev);
  }

  const score = checkAnswers();

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
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
          <button type="submit">Check answers</button>
        )}
      </div>
    </form>
  );
}
