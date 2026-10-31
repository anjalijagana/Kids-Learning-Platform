
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();

  
  
const user = JSON.parse(
  localStorage.getItem('loggedInUser') || 'null'
);

const [scores, setScores] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

  // Fetch overall quiz results
  fetch(`http://127.0.0.1:8080/api/quiz-results/${encodeURIComponent(user.email)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch quiz results');
      }
      return response.json();
    })
    .then((data) => {
      setScores(data);
    })
    .catch((error) => {
      console.error('Error fetching quiz results:', error);
    })
    .finally(() => {
      setLoading(false);
    });

  // Fetch subject-wise progress from MySQL
  fetch(`http://127.0.0.1:8080/api/subject-progress/${encodeURIComponent(user.email)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch subject progress');
      }
      return response.json();
    })
    .then((data) => {
      setSubjectProgress(data);
    })
    .catch((error) => {
      console.error('Error fetching subject progress:', error);
    });

}, [user?.email]);

const latestScore = scores.length > 0 ? scores[0] : null;

  const [subjectProgress, setSubjectProgress] = useState([]);

function getProgress(subject) {
  const item = subjectProgress.find(
    (item) => item.subject === subject
  );

  if (!item || item.total === 0) {
    return 0;
  }

  return Math.round((item.correct / item.total) * 100);
}


  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Please Login First 🔐</h2>
          <Link to="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>
        <div className="nav-actions">
          <Link to="/dashboard" className="nav-button login">
            Dashboard
          </Link>
          <button className="signup" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-welcome">
        
        <h1>👧 My Learning Profile</h1>
        <p>Your learning journey starts here!</p>
      </section>

      <section className="dashboard-content">
        
        <div className="profile-card">
          <div className="profile-avatar">🧒</div>
          <h2>{user.name}</h2>
          <p>Student | KidsLearn Member</p>
          <p>📧 {user.email}</p>
          <p>🌟 Keep learning and shining!</p>
        </div>
        <div className="activity-box">
    <h2>🏆 My Quiz Results</h2>

    {loading ? (
  <p>Loading quiz results...</p>
) : latestScore ? (
  <>
    <h1>{latestScore.score} / {latestScore.total}</h1>
    <p>Latest Quiz Score</p>
    <p>Completed on: {latestScore.date}</p>
  </>
) : (
  <p>You haven't completed a quiz yet. Start learning! 😊</p>
)}
  </div>

        <h2 className="progress-heading">🏆 My Achievements</h2>

        <div className="cards">
          <div className="card math">
            <h1>🥇</h1>
            <h3>Math Star</h3>
            <p>Keep solving number puzzles!</p>
          </div>

          <div className="card english">
            <h1>📖</h1>
            <h3>Word Explorer</h3>
            <p>Discover new words every day!</p>
          </div>

          <div className="card science">
            <h1>🔬</h1>
            <h3>Young Scientist</h3>
            <p>Explore the world around you!</p>
          </div>
        </div>

        <h2 className="progress-heading">📊 My Learning Progress</h2>

        <div className="progress-box">
  <p>
    Mathematics <strong>{getProgress('Mathematics')}%</strong>
  </p>
  <progress value={getProgress('Mathematics')} max="100"></progress>

  <p>
    English <strong>{getProgress('English')}%</strong>
  </p>
  <progress value={getProgress('English')} max="100"></progress>

  <p>
    Science <strong>{getProgress('Science')}%</strong>
  </p>
  <progress value={getProgress('Science')} max="100"></progress>
</div>

        <div className="activity-box">
          <h2>🎯 My Learning Goal</h2>
          <p>Learn something new every day!</p>
          <h1>🌈 Believe in Yourself!</h1>
        </div>
      </section>
    </div>
  );
}

export default Profile;
