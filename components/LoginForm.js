import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/LoginForm.module.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL|| 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/api/auth`, { email, password });
      const { token, user } = response.data;
      console.log('Login Success', response.data);
           // If login is successful, you might want to save the token or user info (like JWT)
           localStorage.setItem('authToken', token);
           localStorage.setItem('userDetails', JSON.stringify(user)); // Save token to localStorage

           // Show success notification
           toast.success('Login Successful! Redirecting...', {
             position: 'top-right',
             autoClose: 1000,
     
           });
           // Redirect to homepage after a short delay
      setTimeout(() => {
        router.push('/'); // Redirect to the homepage (or desired route)
      }, 1000); 
     
    } catch (error) {
        // Handle error message from the backend or a general error
      const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Login failed. Please try again.';
    setError(errorMessage); // Display error message in the form
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
    });
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
