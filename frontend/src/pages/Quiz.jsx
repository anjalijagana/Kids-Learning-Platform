
import { useState } from 'react';
import { Link } from 'react-router-dom';

const questions = [
  {
    question: 'What is 5 + 3?',
    options: ['6', '8', '10', '12'],
    answer: '8',
    subject: 'Mathematics'
  },
  {
    question: 'How many letters are there in the English alphabet?',
    options: ['24', '25', '26', '27'],
    answer: '26',
    subject: 'English'
  },
  {
    question: 'Which planet do we live on?',
    options: ['Mars', 'Earth', 'Jupiter', 'Saturn'],
    answer: 'Earth',
    subject: 'Science'
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Elephant', 'Tiger', 'Lion', 'Bear'],
    answer: 'Lion',
    subject: 'Science'
  },
  {
    question: 'What is 10 - 4?',
    options: ['4', '5', '6', '7'],
    answer: '6',
    subject: 'Mathematics'
  }
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [subjectScores, setSubjectScores] = useState({
  Mathematics: { correct: 0, total: 0 },
  English: { correct: 0, total: 0 },
  Science: { correct: 0, total: 0 }
});
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question = questions[current];

 function checkAnswer() {
  if (!selected) return;

  setSubjectScores((previous) => ({
    ...previous,
    [question.subject]: {
      correct:
        previous[question.subject].correct +
        (selected === question.answer ? 1 : 0),
      total: previous[question.subject].total + 1
    }
  }));

  if (selected === question.answer) {
    setScore((previous) => previous + 1);
  }

  setSubmitted(true);
}

 

async function nextQuestion() {
  if (current < questions.length - 1) {
    setCurrent(current + 1);
    setSelected('');
    setSubmitted(false);
  } else {
    const finalScore = score;

    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || 'null'
    );

    if (!loggedInUser) {
      alert('Please login first!');
      return;
    }

    try {
      // 1. Save overall quiz result
      const response = await fetch(
        'http://127.0.0.1:8080/api/quiz-results',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: loggedInUser.email,
            score: finalScore,
            total: questions.length,
            date: new Date().toLocaleDateString()
          })
        }
      );

      if (!response.ok) {
        throw new Error('Could not save quiz result');
      }

      // 2. Save each subject's progress in MySQL
      for (const [subject, progress] of Object.entries(subjectScores)) {
        if (progress.total > 0) {
          const progressResponse = await fetch(
            'http://127.0.0.1:8080/api/subject-progress',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: loggedInUser.email,
                subject: subject,
                correct: progress.correct,
                total: progress.total
              })
            }
          );

          if (!progressResponse.ok) {
            throw new Error('Could not save subject progress');
          }
        }
      }

      // 3. Keep local progress as a temporary backup
      localStorage.setItem(
        'kidsLearnProgress',
        JSON.stringify(subjectScores)
      );

      setFinished(true);
      alert('Quiz results and subject progress saved successfully! 🎉');

    } catch (error) {
      alert('Unable to save results. Please check your backend.');
      console.error(error);
    }
  }
}

  function restartQuiz() {
    setCurrent(0);
    setSelected('');
    setScore(0);
    setFinished(false);
    setSubmitted(false);
    setSubjectScores({
  Mathematics: { correct: 0, total: 0 },
  English: { correct: 0, total: 0 },
  Science: { correct: 0, total: 0 }
});
  }

  return (
    <div className="quiz-page">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>
        <Link to="/dashboard" className="nav-button login">
          ← Dashboard
        </Link>
      </nav>

      <section className="quiz-container">
        <h1>🎮 Fun Learning Quiz</h1>

        {!finished ? (
          <>
            <p>Question {current + 1} of {questions.length}</p>
            <h2>{question.question}</h2>
            <p className="quiz-subject">Subject: {question.subject}</p>

            <div className="quiz-options">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={selected === option ? 'selected-option' : ''}
                  onClick={() => !submitted && setSelected(option)}
                  disabled={submitted}
                >
                  {option}
                </button>
              ))}
            </div>

            {submitted && (
              <h3 className={selected === question.answer ? 'correct' : 'incorrect'}>
                {selected === question.answer
                  ? '🎉 Correct Answer!'
                  : `❌ Correct answer: ${question.answer}`}
              </h3>
            )}

            {!submitted ? (
              <button
                className="quiz-main-button"
                onClick={checkAnswer}
                disabled={!selected}
              >
                Submit Answer
              </button>
            ) : (
              <button className="quiz-main-button" onClick={nextQuestion}>
                {current === questions.length - 1
                  ? 'See My Score'
                  : 'Next Question →'}
              </button>
            )}

            <h3>⭐ Score: {score}</h3>
          </>
        ) : (
          <div className="quiz-result">
            <h1>🏆 Quiz Completed!</h1>
            <h2>Your Score: {score} / {questions.length}</h2>
            <p>
              {score === questions.length
                ? 'Amazing! You got all answers correct! 🌟'
                : 'Good effort! Keep learning and try again! 😊'}
            </p>
            <button className="quiz-main-button" onClick={restartQuiz}>
              Play Again 🔄
            </button>
            <p><Link to="/dashboard">Back to Dashboard</Link></p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Quiz;
