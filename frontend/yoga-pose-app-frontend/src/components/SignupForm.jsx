import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css'; // Reuse the same CSS as LoginForm

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/signup', formData);
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
        setLoading(false);
      }, 1500); // Show loader for 1.5 seconds
    } catch (error) {
      setLoading(false);
      toast.error('Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className="loader-box">
          <div className="yoga-3d-loader">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
          </div>
          <div className="loader-text">Creating your Yoga Pose account...</div>
        </div>
      ) : (
        <div className="signup-box">
          <form
            className="signup-form"
            onSubmit={e => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <h2>Sign Up</h2>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              name="age"
              placeholder="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              min="1"
              required
            />
            <button type="submit" className="signup-button">Sign Up</button>
            <div className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default SignupForm;
