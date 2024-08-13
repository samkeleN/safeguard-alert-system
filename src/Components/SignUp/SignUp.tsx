import "./SignUp.css";

const SignUp = () => {
  const handleFacebookSignUp = () => {
    // Implement Facebook sign-up logic here
    console.log("Sign up with Facebook");
  };

  const handleGoogleSignUp = () => {
    // Implement Google sign-up logic here
    console.log("Sign up with Google");
  };

  return (
    <div className="signup-container">
      <div className="container">
        <h1>Sign Up</h1>
        <div className="signup-options">
          <button
            className="signup-button facebook"
            onClick={handleFacebookSignUp}
          >
            Sign Up with Facebook
          </button>
          <button className="signup-button google" onClick={handleGoogleSignUp}>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
