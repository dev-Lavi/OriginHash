import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', { email, password, userType });
    alert('Registration submitted (frontend only)');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h2>Register</h2>
        <p>Get started with OriginHash</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>User Type</label>
          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="corporate"
                checked={userType === 'corporate'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Corporate
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="individual"
                checked={userType === 'individual'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Individual
            </label>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      <div className="auth-right">
        <img
          src="/illustration.png"
          alt="illustration"
          className="auth-image"
        />
      </div>
    </div>
  );
};

export default Register;
