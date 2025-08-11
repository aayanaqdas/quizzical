import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function QuestionsPage(props) {
  const isGameOver = false;
  console.log(props.data);

  function shuffleAnswers(question) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    let i = answers.length,
      j,
      temp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = answers[j];
      answers[j] = answers[i];
      answers[i] = temp;
    }
    return answers;
  }

  const quizElements = props.data.map((question) => {
    const questionId = nanoid();
    const shuffledAnswers = shuffleAnswers(question);

    const optionsElements = shuffledAnswers.map((option) => {
      const optionId = nanoid();
      return (
        <div key={optionId}>
          <input type="radio" id={optionId} name={questionId} value={option} />
          <label htmlFor={optionId}>{option}</label>
        </div>
      );
    });
    return (
      <section className="question-wrapper" key={questionId}>
        <h2 className="question-text">{decode(question.question)}</h2>
        <div className="radio-button-group">{optionsElements}</div>
      </section>
    );
  });
  return (
    <div className="quiz-container">
      {quizElements}
      <div className="quiz-result-container">
        {isGameOver ? (
          <>
            <h3>You scored 3/5 correct answers</h3>
            <button>Play again</button>
          </>
        ) : (
          <button>Check answers</button>
        )}
      </div>
    </div>
  );
}
