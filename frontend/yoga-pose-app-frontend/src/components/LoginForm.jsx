import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveToken } from './auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { setexpiryTime } from './auth';
import { setUserName } from './auth';
import './LoginForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success('User registered successfully!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '18px',
          fontWeight: 500,
          fontSize: '1.05rem',
          background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          color: '#2563eb',
        }
      });
      // Remove the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state?.loggedOut) {
      toast.success('User logged out successfully!', {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '18px',
          fontWeight: 500,
          fontSize: '1.05rem',
          background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          color: '#2563eb',
        }
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      saveToken(res.data.token);
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      const expiry = payload.exp * 1000;
      setexpiryTime(expiry);
      setUserName(res);
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);
    } catch (err) {
      setLoading(false);
      toast.error('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="bottom-right" />
      {loading ? (
        <div className="loader-box">
          <div className="yoga-3d-loader">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
          </div>
          <div className="loader-text">Welcome to Yoga Pose Detection & Correction App...</div>
        </div>
      ) : (
        <div className="login-box">
          <form className="login-form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <h2>Login</h2>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Login</button>
            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
