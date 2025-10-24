import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import styles from '../styles/SignupForm.module.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Add state for username
  const [error, setError] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if all fields are filled
    if (!email || !password || !username) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send email, password, and username to the API
      const response = await axios.post(`${API_URL}/api/auth`, { email, password, username });
      console.log('Signup Success', response.data);
alert("Signup Successful!")
      // Show success toast notification
      toast.success('Signup Successful! You can now log in.', {
        position: 'top-right', 
        autoClose: 3000,  // Duration for the toast to appear
      });
    } catch (error) {
      // Handle error message
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Signup failed. Please try again.';

      setError(errorMessage); // Ensure we are only setting a string error message

      // Show error toast notification
      toast.error(errorMessage, {
        position: 'top-right', // Use direct string instead of toast.POSITION.TOP_RIGHT
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create an Account</h2>
      {error && <div className={styles.error}>{error}</div>} {/* Display the error message */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Handle username change
            required
          />
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
