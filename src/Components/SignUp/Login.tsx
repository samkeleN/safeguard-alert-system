import { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase';
import CPTimage from '../../assets/cptTable.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to handle login errors
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");

      // Redirect to Dashboard after successful login
      navigate('/dashboard', { state: { userEmail: email } });
    } catch (err) {
      setError("Failed to login. Please check your email and password.");
      console.error(err);
    }
  }

  return (
    <div className="signup-container">
      <img src={CPTimage} alt="Sign Up" className="signup-image" />
      <form action="" className="signup-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>} {/* Show login error if any */}
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> <br />
        <p>
          Don't have an Account? <Link to="/signup" className='already'>SignUp HERE!</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;
