import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase';
import './SignUp.css';
import CPTimage from '../../assets/cptTable.jpg';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created");

      // Redirect to Dashboard after successful sign-up
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup-container">
      <img src={CPTimage} alt="Sign Up" className="signup-image" />
      <form action="" className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button> <br />
        <p>
          Already Registered? <Link to="/login" className='already'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;