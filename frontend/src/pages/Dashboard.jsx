
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [subjectProgress, setSubjectProgress] = useState([]);

  // Get logged-in student details
  const user = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  );

  // Fetch subject progress from MySQL
  useEffect(() => {
    if (!user) return;

    fetch(
      `http://127.0.0.1:8080/api/subject-progress/${encodeURIComponent(user.email)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }
        return response.json();
      })
      .then((data) => {
        setSubjectProgress(data);
      })
      .catch((error) => {
        console.error('Error fetching progress:', error);
      });
  }, []);

  // Calculate subject percentage
  function getProgress(subject) {
    const item = subjectProgress.find(
      (item) => item.subject === subject
    );

    if (!item || item.total === 0) {
      return 0;
    }

    return Math.round((item.correct / item.total) * 100);
  }

  // Logout function
  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('user');
    localStorage.removeItem('kidsLearnProgress');

    window.location.href = '/login';
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>

        <div className="nav-actions">
          <Link to="/" className="nav-button login">
            Home
          </Link>

          <Link to="/profile" className="nav-button login">
            My Profile 👤
          </Link>

          <button
            className="nav-button signup"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-welcome">
        <h1>Hello, {user?.name || 'Little Learner'}! 👋</h1>
        <p>Ready to learn something amazing today?</p>
      </section>

      <section className="dashboard-content">
        <h2>📚 My Subjects</h2>

        <div className="cards">
          <div className="card math">
            <h1>🔢</h1>
            <h3>Mathematics</h3>
            <p>Numbers, puzzles and fun calculations.</p>
            <Link to="/mathematics">Explore →</Link>
          </div>

          <div className="card english">
            <h1>🔤</h1>
            <h3>English</h3>
            <p>Letters, words and interesting stories.</p>
            <Link to="/english">Explore →</Link>
          </div>

          <div className="card science">
            <h1>🔬</h1>
            <h3>Science</h3>
            <p>Discover nature and the world around you.</p>
            <Link to="/science">Explore →</Link>
          </div>
        </div>

        <h2 className="progress-heading">
          ⭐ My Learning Progress
        </h2>

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
          <h2>🎮 Fun Learning Zone</h2>
          <p>
            Practice your knowledge with exciting quizzes and games!
          </p>

          <Link to="/quiz" className="nav-button signup">
            Start Quiz 🚀
          </Link>
        </div>
      </section>

      <footer>
        <p>© 2026 KidsLearn | Learn Something New Every Day! ❤️</p>
      </footer>
    </div>
  );
}

export default Dashboard;
