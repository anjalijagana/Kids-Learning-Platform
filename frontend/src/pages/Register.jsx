
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'http://127.0.0.1:8080/api/students/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const result = await response.text();

      if (!response.ok) {
        alert('Registration failed: ' + result);
        return;
      }

      if (result === 'Student Registered Successfully!') {
        alert('Registration Successful! 🎉');
        navigate('/login');
      } else {
        alert(result);
      }

    } catch (error) {
      alert('Cannot connect to the server. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🌈 KidsLearn</h1>
        <h2>Create Account</h2>
        <p>Join KidsLearn and start learning!</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="6"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Register;
