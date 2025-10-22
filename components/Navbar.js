import React from 'react';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Freno Business</div>
      <div className={styles.navLinks}>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>Home</a>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>About</a>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>Services</a>
          <div className={styles.dropdown}>
            <ul>
              <li><a href="#" className={styles.dropdownLink}>Consulting</a></li>
              <li><a href="#" className={styles.dropdownLink}>Development</a></li>
              <li><a href="#" className={styles.dropdownLink}>Design</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>Products</a>
          <div className={styles.dropdown}>
            <ul>
              <li><a href="#" className={styles.dropdownLink}>Software</a></li>
              <li><a href="#" className={styles.dropdownLink}>Hardware</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>Contact</a>
        </div>
      </div>
      <div className={styles.authButtons}>
        <a href="/signup" className={styles.signupBtn}>Sign Up</a>
        <a href="/login" className={styles.loginBtn}>Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
