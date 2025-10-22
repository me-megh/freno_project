import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post('/api/auth', { email, password });
      console.log('Login Success', response.data);
    } catch (error) {
      setError(
        error.response ? error.response.data : 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login to Your Account</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
