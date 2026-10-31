
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Science() {
  const [activeTab, setActiveTab] = useState('Space');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mass, setMass] = useState('');
  const [gravity, setGravity] = useState('9.8');
  const [weight, setWeight] = useState('');

  const topics = {
    Space: {
      title: '🌍 Solar System',
      explanation: 'Our solar system has eight planets that orbit the Sun.',
      facts: [
        'Mercury is the closest planet to the Sun.',
        'Earth is the only known planet with life.',
        'Jupiter is the largest planet.',
        'Saturn is famous for its beautiful rings.'
      ]
    },
    Biology: {
      title: '🌱 Biology',
      explanation: 'Biology is the study of living organisms.',
      facts: [
        'Plants make food through photosynthesis.',
        'The heart pumps blood around the body.',
        'The brain controls many body activities.',
        'Animals need food, water and oxygen to survive.'
      ]
    },
    Physics: {
      title: '⚡ Physics',
      explanation: 'Physics studies matter, energy, force and motion.',
      facts: [
        'Force can change an object’s motion.',
        'Gravity pulls objects towards Earth.',
        'Light travels faster than sound.',
        'Energy can change from one form to another.'
      ]
    },
    Chemistry: {
      title: '🧪 Chemistry',
      explanation: 'Chemistry is the study of matter and its changes.',
      facts: [
        'Water has the chemical formula H₂O.',
        'Oxygen is needed for human respiration.',
        'Matter exists as solid, liquid and gas.',
        'Atoms are the basic building blocks of matter.'
      ]
    }
  };

  const questions = [
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      answer: 'Mars'
    },
    {
      question: 'Which gas do plants absorb during photosynthesis?',
      options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
      answer: 'Carbon dioxide'
    },
    {
      question: 'What is the chemical formula of water?',
      options: ['CO₂', 'O₂', 'H₂O', 'NaCl'],
      answer: 'H₂O'
    }
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  function checkAnswer() {
    if (!selectedAnswer) {
      setFeedback('Please select an answer!');
      return;
    }

    if (selectedAnswer === questions[questionIndex].answer) {
      setFeedback('🎉 Correct! You are a Science Star!');
      setScore(score + 1);
    } else {
      setFeedback('😊 Incorrect. Read the topic and try again.');
    }
  }

  function nextQuestion() {
    setQuestionIndex((questionIndex + 1) % questions.length);
    setSelectedAnswer('');
    setFeedback('');
  }

  function calculateWeight() {
    if (mass.trim() === '' || Number(mass) < 0) {
      setWeight('Enter a valid mass in kilograms.');
      return;
    }

    setWeight(
      `Your weight is ${(Number(mass) * Number(gravity)).toFixed(2)} Newtons (N).`
    );
  }

  const currentTopic = topics[activeTab];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>
        <Link to="/dashboard" className="nav-button login">
          ← Dashboard
        </Link>
      </nav>

      <section className="dashboard-welcome">
        <h1>🔬 Science Discovery World</h1>
        <p>Explore space, living things, physics and chemistry!</p>
        <h3>⭐ Science Quiz Score: {score}</h3>
      </section>

      <section className="dashboard-content">
        <h2>🚀 Explore Science</h2>

        <div className="cards">
          {['Space', 'Biology', 'Physics', 'Chemistry', 'Quiz', 'Weight'].map((tab) => (
            <button
              key={tab}
              className="nav-button signup"
              onClick={() => {
                setActiveTab(tab);
                setFeedback('');
              }}
            >
              {tab === 'Space' && '🌍 '}
              {tab === 'Biology' && '🌱 '}
              {tab === 'Physics' && '⚡ '}
              {tab === 'Chemistry' && '🧪 '}
              {tab === 'Quiz' && '🧠 '}
              {tab === 'Weight' && '⚖️ '}
              {tab}
            </button>
          ))}
        </div>

        {topics[activeTab] && (
          <div className="activity-box">
            <h2>{currentTopic.title}</h2>
            <p>{currentTopic.explanation}</p>

            <h3>🌟 Interesting Facts</h3>

            {currentTopic.facts.map((fact, index) => (
              <p key={index}>⭐ {fact}</p>
            ))}
          </div>
        )}

        {activeTab === 'Quiz' && (
          <div className="activity-box">
            <h2>🧠 Science Quiz</h2>
            <p>Question {questionIndex + 1} of {questions.length}</p>

            <h3>{questions[questionIndex].question}</h3>

            {questions[questionIndex].options.map((option) => (
              <button
                key={option}
                className="nav-button login"
                onClick={() => {
                  setSelectedAnswer(option);
                  setFeedback('');
                }}
                style={{
                  margin: '5px',
                  border: selectedAnswer === option ? '3px solid #6c63ff' : 'none'
                }}
              >
                {option}
              </button>
            ))}

            <br />

            <button className="nav-button signup" onClick={checkAnswer}>
              Check Answer
            </button>

            <h3>{feedback}</h3>

            <button className="nav-button login" onClick={nextQuestion}>
              Next Question →
            </button>
          </div>
        )}

        {activeTab === 'Weight' && (
          <div className="activity-box">
            <h2>⚖️ Physics Weight Calculator</h2>
            <p>Weight = Mass × Gravitational acceleration</p>

            <input
              type="number"
              min="0"
              placeholder="Enter mass in kilograms"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
            />

            <p>Select gravitational acceleration:</p>

            <select
              value={gravity}
              onChange={(e) => setGravity(e.target.value)}
            >
              <option value="9.8">Earth (9.8 m/s²)</option>
              <option value="1.62">Moon (1.62 m/s²)</option>
              <option value="3.71">Mars (3.71 m/s²)</option>
              <option value="24.79">Jupiter (24.79 m/s²)</option>
            </select>

            <button className="nav-button signup" onClick={calculateWeight}>
              Calculate Weight
            </button>

            <h3>{weight}</h3>
          </div>
        )}
      </section>
    </div>
  );
}

export default Science;
