
import './App.css';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Mathematics from './pages/Mathematics';
import English from './pages/English';
import Science from './pages/Science';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';

// Protect pages from users who are not logged in
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');

  return user ? children : <Navigate to="/login" replace />;
}

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>🌈 KidsLearn</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#subjects">Subjects</a>
          <a href="#activities">Activities</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="login nav-button">
            Login
          </Link>

          <Link to="/register" className="signup nav-button">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero" id="home">
        <div>
          <h1>Learn, Play & Grow! 🌟</h1>

          <p>
            Welcome to KidsLearn! Explore exciting lessons,
            play educational games and discover something new every day.
          </p>

          <Link to="/login" className="start nav-button">
            Start Learning 🚀
          </Link>
        </div>

        <div className="hero-image">📚 🧸 🎨</div>
      </section>

      <section className="subjects" id="subjects">
        <h2>Explore Our Subjects 📖</h2>

        <div className="cards">
          <div className="card math">
            <h1>🔢</h1>
            <h3>Mathematics</h3>
            <p>Learn numbers and solve fun puzzles.</p>
          </div>

          <div className="card english">
            <h1>🔤</h1>
            <h3>English</h3>
            <p>Explore words, letters and stories.</p>
          </div>

          <div className="card science">
            <h1>🔬</h1>
            <h3>Science</h3>
            <p>Discover the wonderful world of science.</p>
          </div>
        </div>
      </section>

      <section className="activities" id="activities">
        <h2>Fun Learning Activities 🎮</h2>
        <p>
          Learn something new through quizzes, games
          and creative activities!
        </p>
      </section>

      <footer id="about">
        <p>
          © 2026 KidsLearn | Learn Something New Every Day! ❤️
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mathematics"
          element={
            <ProtectedRoute>
              <Mathematics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/english"
          element={
            <ProtectedRoute>
              <English />
            </ProtectedRoute>
          }
        />

        <Route
          path="/science"
          element={
            <ProtectedRoute>
              <Science />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
