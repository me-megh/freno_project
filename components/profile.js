// components/Profile.js
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css'; // Import the CSS module for styling

const Profile = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the user details and token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');

    // Redirect to login page after logout
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Welcome, {user.username || 'User'}</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.info}>
            <label className={styles.infoLabel}>Email:</label>
            <span className={styles.infoValue}>{user.email}</span>
          </div>
          
          <div className={styles.logoutSection}>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
