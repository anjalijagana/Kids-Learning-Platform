
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Mathematics() {
  const [activeTab, setActiveTab] = useState('Lessons');

  // Calculator
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [calcResult, setCalcResult] = useState('');

  // Multiplication table
  const [tableNumber, setTableNumber] = useState('5');

  // Number challenge
  const [challengeA, setChallengeA] = useState(8);
  const [challengeB, setChallengeB] = useState(4);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [challengeMessage, setChallengeMessage] = useState('');
  const [challengeScore, setChallengeScore] = useState(0);

  // Lessons
  const [lesson, setLesson] = useState('Integers');

  const lessons = {
    Integers: {
      explanation: 'Integers include positive numbers, negative numbers and zero.',
      example: '-5 + 8 = 3',
      practice: 'What is -7 + 12?',
      answer: '5'
    },
    Fractions: {
      explanation: 'A fraction represents a part of a whole. The top number is the numerator and the bottom number is the denominator.',
      example: '1/2 + 1/2 = 1',
      practice: 'What is 1/4 + 2/4? (Enter the answer as a fraction)',
      answer: '3/4'
    },
    Decimals: {
      explanation: 'Decimals represent numbers with a decimal point.',
      example: '2.5 + 1.5 = 4',
      practice: 'What is 3.5 + 2.5?',
      answer: '6'
    },
    Percentages: {
      explanation: 'Percentage means a number out of 100.',
      example: '50% of 200 = 100',
      practice: 'What is 25% of 80?',
      answer: '20'
    },
    Algebra: {
      explanation: 'Algebra uses letters to represent unknown numbers.',
      example: 'If x + 5 = 12, then x = 7.',
      practice: 'If x + 8 = 15, find x.',
      answer: '7'
    }
  };

  const [lessonAnswer, setLessonAnswer] = useState('');
  const [lessonMessage, setLessonMessage] = useState('');

  // Calculator function
  function calculate() {
    const a = Number(num1);
    const b = Number(num2);

    if (num1.trim() === '' || num2.trim() === '') {
      setCalcResult('Please enter both numbers.');
      return;
    }

    if (operation === '/' && b === 0) {
      setCalcResult('Cannot divide by zero!');
      return;
    }

    let result;

    if (operation === '+') result = a + b;
    if (operation === '-') result = a - b;
    if (operation === '*') result = a * b;
    if (operation === '/') result = a / b;

    setCalcResult('Answer: ' + Number(result.toFixed(6)));
  }

  // New challenge question
  function newChallenge() {
    setChallengeA(Math.floor(Math.random() * 20) + 1);
    setChallengeB(Math.floor(Math.random() * 20) + 1);
    setChallengeAnswer('');
    setChallengeMessage('');
  }

  // Check challenge answer
  function checkChallenge() {
    if (challengeAnswer.trim() === '') {
      setChallengeMessage('Please enter your answer!');
      return;
    }

    if (Number(challengeAnswer) === challengeA + challengeB) {
      setChallengeMessage('🎉 Correct! Excellent work!');
      setChallengeScore(challengeScore + 1);
    } else {
      setChallengeMessage('😊 Try again! You can do it.');
    }
  }

  // Check lesson answer
  function checkLesson() {
    if (lessonAnswer.trim() === '') {
      setLessonMessage('Please enter an answer!');
      return;
    }

    if (lessonAnswer.trim() === lessons[lesson].answer) {
      setLessonMessage('🎉 Excellent! Your answer is correct.');
    } else {
      setLessonMessage('😊 Not quite. Read the example and try again.');
    }
  }

  const selectedLesson = lessons[lesson];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>
        <Link to="/dashboard" className="nav-button login">
          ← Dashboard
        </Link>
      </nav>

      <section className="dashboard-welcome">
        <h1>🔢 Mathematics World</h1>
        <p>Learn, calculate, practise and become a Maths Champion!</p>
        <h3>⭐ Your Challenge Score: {challengeScore}</h3>
      </section>

      <section className="dashboard-content">
        <h2>🚀 Explore Mathematics</h2>

        <div className="cards">
          {['Lessons', 'Calculator', 'Tables', 'Challenge', 'Geometry'].map((tab) => (
            <button
              key={tab}
              className="nav-button signup"
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Lessons' && '📚 '}
              {tab === 'Calculator' && '🧮 '}
              {tab === 'Tables' && '✖️ '}
              {tab === 'Challenge' && '🎯 '}
              {tab === 'Geometry' && '📐 '}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Lessons' && (
          <div className="activity-box">
            <h2>📚 Mathematics Lessons</h2>

            <div className="cards">
              {Object.keys(lessons).map((name) => (
                <button
                  key={name}
                  className="nav-button login"
                  onClick={() => {
                    setLesson(name);
                    setLessonAnswer('');
                    setLessonMessage('');
                  }}
                >
                  {name}
                </button>
              ))}
            </div>

            <h2>{lesson}</h2>
            <p>{selectedLesson.explanation}</p>
            <h3>Example</h3>
            <h2>{selectedLesson.example}</h2>

            <hr />

            <h3>🧠 Practice Question</h3>
            <p>{selectedLesson.practice}</p>

            <input
              type="text"
              placeholder="Type your answer"
              value={lessonAnswer}
              onChange={(e) => setLessonAnswer(e.target.value)}
            />

            <button className="nav-button signup" onClick={checkLesson}>
              Check Answer
            </button>

            <p>{lessonMessage}</p>
          </div>
        )}

        {activeTab === 'Calculator' && (
          <div className="activity-box">
            <h2>🧮 Math Calculator</h2>

            <input
              type="number"
              placeholder="Enter first number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />

            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="+">Addition (+)</option>
              <option value="-">Subtraction (-)</option>
              <option value="*">Multiplication (×)</option>
              <option value="/">Division (÷)</option>
            </select>

            <input
              type="number"
              placeholder="Enter second number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />

            <button className="nav-button signup" onClick={calculate}>
              Calculate
            </button>

            <h2>{calcResult}</h2>
          </div>
        )}

        {activeTab === 'Tables' && (
          <div className="activity-box">
            <h2>✖️ Multiplication Table Generator</h2>

            <input
              type="number"
              min="1"
              max="100"
              placeholder="Enter a number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />

            {tableNumber !== '' &&
              Number(tableNumber) > 0 &&
              Number(tableNumber) <= 100 && (
                <div>
                  {Array.from({ length: 10 }, (_, i) => (
                    <p key={i}>
                      {tableNumber} × {i + 1} = {Number(tableNumber) * (i + 1)}
                    </p>
                  ))}
                </div>
              )}
          </div>
        )}

        {activeTab === 'Challenge' && (
          <div className="activity-box">
            <h2>🎯 Number Challenge</h2>
            <p>Solve this question:</p>

            <h1>{challengeA} + {challengeB} = ?</h1>

            <input
              type="number"
              placeholder="Enter your answer"
              value={challengeAnswer}
              onChange={(e) => setChallengeAnswer(e.target.value)}
            />

            <button className="nav-button signup" onClick={checkChallenge}>
              Submit Answer
            </button>

            <h3>{challengeMessage}</h3>
            <p>🏆 Score: {challengeScore}</p>

            <button className="nav-button login" onClick={newChallenge}>
              Next Question
            </button>
          </div>
        )}

        {activeTab === 'Geometry' && (
          <div className="activity-box">
            <h2>📐 Geometry Explorer</h2>

            <div className="cards">
              <div className="card math">
                <h1>🟦</h1>
                <h3>Square</h3>
                <p>Area = side × side</p>
                <p>Perimeter = 4 × side</p>
              </div>

              <div className="card english">
                <h1>▭</h1>
                <h3>Rectangle</h3>
                <p>Area = length × width</p>
                <p>Perimeter = 2 × (length + width)</p>
              </div>

              <div className="card science">
                <h1>🔺</h1>
                <h3>Triangle</h3>
                <p>Area = ½ × base × height</p>
              </div>

              <div className="card math">
                <h1>⚪</h1>
                <h3>Circle</h3>
                <p>Area = π × radius × radius</p>
                <p>Circumference = 2 × π × radius</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Mathematics;
