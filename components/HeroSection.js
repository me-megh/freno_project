import React from 'react';
import styles from '../styles/hero.module.css';

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.title}>Welcome to Our Business</h1>
      <p className={styles.description}>
        Your one-stop solution for professional services. Join us today and grow your business!
      </p>
      <div className={styles.ctaButtons}>
        <a href="/signup" className={styles.signupBtn}>Sign Up</a>
        <a href="/login" className={styles.loginBtn}>Login</a>
      </div>
    </div>
  );
};

export default HeroSection;
