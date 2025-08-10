export default function QuestionsPage() {
  const isGameOver = false;
  return (
    <div className="quiz-container">
      <section className="question-wrapper">
        <h2 className="question-text">How would one say goodbye in Spanish?</h2>
        <div className="radio-button-group">
          <input type="radio" id="option1" name="choice" value="1" />
          <label htmlFor="option1">Adiós</label>

          <input type="radio" id="option2" name="choice" value="2" />
          <label htmlFor="option2">Hola</label>

          <input type="radio" id="option3" name="choice" value="3" />
          <label htmlFor="option3">Au Revoir</label>

          <input type="radio" id="option4" name="choice" value="4" />
          <label htmlFor="option4">Salir</label>
        </div>
      </section>

      <section className="question-wrapper">
        <h2 className="question-text">How would one say goodbye in Spanish?</h2>
        <div className="radio-button-group">
          <input type="radio" id="option1" name="choice" value="1" />
          <label htmlFor="option1">Adiós</label>

          <input type="radio" id="option2" name="choice" value="2" />
          <label htmlFor="option2">Hola</label>

          <input type="radio" id="option3" name="choice" value="3" />
          <label htmlFor="option3">Au Revoir</label>

          <input type="radio" id="option4" name="choice" value="4" />
          <label htmlFor="option4">Salir</label>
        </div>
      </section>

      <section className="question-wrapper">
        <h2 className="question-text">How would one say goodbye in Spanish?</h2>
        <div className="radio-button-group">
          <input type="radio" id="option1" name="choice" value="1" />
          <label htmlFor="option1">Adiós</label>

          <input type="radio" id="option2" name="choice" value="2" />
          <label htmlFor="option2">Hola</label>

          <input type="radio" id="option3" name="choice" value="3" />
          <label htmlFor="option3">Au Revoir</label>

          <input type="radio" id="option4" name="choice" value="4" />
          <label htmlFor="option4">Salir</label>
        </div>
      </section>

      <section className="question-wrapper">
        <h2 className="question-text">How would one say goodbye in Spanish?</h2>
        <div className="radio-button-group">
          <input type="radio" id="option1" name="choice" value="1" />
          <label htmlFor="option1">Adiós</label>

          <input type="radio" id="option2" name="choice" value="2" />
          <label htmlFor="option2">Hola</label>

          <input type="radio" id="option3" name="choice" value="3" />
          <label htmlFor="option3">Au Revoir</label>

          <input type="radio" id="option4" name="choice" value="4" />
          <label htmlFor="option4">Salir</label>
        </div>
      </section>

      <section className="question-wrapper">
        <h2 className="question-text">How would one say goodbye in Spanish?</h2>
        <div className="radio-button-group">
          <input type="radio" id="option1" name="choice" value="1" />
          <label htmlFor="option1">Adiós</label>

          <input type="radio" id="option2" name="choice" value="2" />
          <label htmlFor="option2">Hola</label>

          <input type="radio" id="option3" name="choice" value="3" />
          <label htmlFor="option3">Au Revoir</label>

          <input type="radio" id="option4" name="choice" value="4" />
          <label htmlFor="option4">Salir</label>
        </div>
      </section>

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
