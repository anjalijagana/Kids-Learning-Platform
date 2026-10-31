
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    // 1. Check empty fields
    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      alert('Please enter both email and password!');
      return;
    }

    // 2. Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      alert('Please enter a valid email address!');
      return;
    }

    try {
      setLoading(true);

      // 3. Send login request to Spring Boot
      const response = await fetch(
        'http://127.0.0.1:8080/api/students/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: cleanEmail,
            password
          })
        }
      );

      const result = await response.json();

      // 4. Check login response
      if (response.ok && result.message === 'Login Successful!') {

        // 5. Store student details
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({
            name: result.name,
            email: result.email
          })
        );

        alert('Login Successful! 🎉');

        // 6. Navigate to Dashboard
        navigate('/dashboard');

      } else {
        alert(result.message || 'Invalid email or password!');
      }

    } catch (error) {
      alert('Cannot connect to the server. Please try again.');
      console.error('Login error:', error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🌈 KidsLearn</h1>
        <h2>Welcome Back!</h2>
        <p>Login to continue your learning journey.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </p>

        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
