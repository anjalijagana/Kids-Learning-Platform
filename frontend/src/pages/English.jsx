
import { useState } from 'react';
import { Link } from 'react-router-dom';

function English() {
  const [activeTab, setActiveTab] = useState('Grammar');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [word, setWord] = useState('');
  const [sentence, setSentence] = useState('');
  const [sentenceFeedback, setSentenceFeedback] = useState('');

  const questions = [
    {
      question: 'Which is a noun?',
      options: ['Beautiful', 'School', 'Quickly', 'Running'],
      answer: 'School'
    },
    {
      question: 'Choose the correct past tense of "Go".',
      options: ['Goed', 'Going', 'Went', 'Goes'],
      answer: 'Went'
    },
    {
      question: 'Choose the correct article: ___ apple.',
      options: ['A', 'An', 'Thee', 'No article'],
      answer: 'An'
    }
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[questionIndex];

  function checkAnswer() {
    if (!answer) {
      setFeedback('Please select an answer!');
      return;
    }

    if (answer === currentQuestion.answer) {
      setFeedback('🎉 Correct! Excellent English!');
      setScore(score + 1);
    } else {
      setFeedback('😊 Incorrect. Try learning the rule again.');
    }
  }

  function nextQuestion() {
    setQuestionIndex((questionIndex + 1) % questions.length);
    setAnswer('');
    setFeedback('');
  }

  function checkWord() {
    const cleaned = word.trim().toLowerCase();

    if (!cleaned) {
      setSentenceFeedback('Please enter a word!');
      return;
    }

    const examples = {
      happy: 'Sad',
      big: 'Small',
      brave: 'Cowardly',
      ancient: 'Modern',
      difficult: 'Easy',
      begin: 'End'
    };

    setSentenceFeedback(
      examples[cleaned]
        ? `Opposite of ${cleaned} is ${examples[cleaned]}.`
        : 'Try another word: happy, big, brave, ancient, difficult or begin.'
    );
  }

  function checkSentence() {
    const text = sentence.trim();

    if (!text) {
      setSentenceFeedback('Please write a sentence first!');
    } else if (text.split(/\s+/).length < 3) {
      setSentenceFeedback('Try writing a complete sentence with at least 3 words.');
    } else if (!/[.!?]$/.test(text)) {
      setSentenceFeedback('Remember to finish your sentence with a full stop, question mark or exclamation mark.');
    } else {
      setSentenceFeedback('🌟 Great! You have written a complete sentence.');
    }
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>
        <Link to="/dashboard" className="nav-button login">
          ← Dashboard
        </Link>
      </nav>

      <section className="dashboard-welcome">
        <h1>🔤 English Learning World</h1>
        <p>Improve your grammar, vocabulary and communication skills!</p>
        <h3>🏆 Quiz Score: {score}</h3>
      </section>

      <section className="dashboard-content">
        <h2>🚀 Explore English</h2>

        <div className="cards">
          {['Grammar', 'Vocabulary', 'Writing', 'Quiz'].map((tab) => (
            <button
              key={tab}
              className="nav-button signup"
              onClick={() => {
                setActiveTab(tab);
                setFeedback('');
                setSentenceFeedback('');
              }}
            >
              {tab === 'Grammar' && '📖 '}
              {tab === 'Vocabulary' && '📚 '}
              {tab === 'Writing' && '✍️ '}
              {tab === 'Quiz' && '🧠 '}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Grammar' && (
          <div className="activity-box">
            <h2>📖 Grammar Learning</h2>
            <h3>Parts of Speech</h3>
            <p><b>Noun:</b> Name of a person, place or thing. Example: Teacher.</p>
            <p><b>Pronoun:</b> A word used instead of a noun. Example: She, He, They.</p>
            <p><b>Verb:</b> An action word. Example: Run, Eat, Write.</p>
            <p><b>Adjective:</b> Describes a noun. Example: Beautiful, Tall.</p>
            <p><b>Adverb:</b> Describes an action. Example: Quickly, Slowly.</p>

            <hr />
            <h3>Practice Question</h3>
            <p>Identify the noun in: "The teacher reads a book."</p>
            <p><b>Answer:</b> Teacher and book.</p>
          </div>
        )}

        {activeTab === 'Vocabulary' && (
          <div className="activity-box">
            <h2>📚 Vocabulary Builder</h2>
            <p>Enter a word to discover its opposite.</p>

            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word, e.g. Happy"
            />

            <button className="nav-button signup" onClick={checkWord}>
              Find Opposite
            </button>

            <h3>{sentenceFeedback}</h3>

            <hr />
            <h3>Useful Words</h3>
            <p>Happy – Joyful</p>
            <p>Begin – Start</p>
            <p>Beautiful – Attractive</p>
            <p>Quick – Fast</p>
          </div>
        )}

        {activeTab === 'Writing' && (
          <div className="activity-box">
            <h2>✍️ Sentence Writing Practice</h2>
            <p>Write a meaningful sentence using your own words.</p>

            <textarea
              rows="4"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Write your sentence here..."
            />

            <button className="nav-button signup" onClick={checkSentence}>
              Check My Sentence
            </button>

            <h3>{sentenceFeedback}</h3>
            <p>Tip: Start with a capital letter and end with punctuation.</p>
          </div>
        )}

        {activeTab === 'Quiz' && (
          <div className="activity-box">
            <h2>🧠 English Quiz</h2>
            <p>Question {questionIndex + 1} of {questions.length}</p>
            <h3>{currentQuestion.question}</h3>

            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className="nav-button login"
                onClick={() => {
                  setAnswer(option);
                  setFeedback('');
                }}
                style={{
                  margin: '5px',
                  border: answer === option ? '3px solid #6c63ff' : 'none'
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
      </section>
    </div>
  );
}

export default English;
