import React, { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if the user is logged in by checking localStorage for the token
    const token = localStorage.getItem("authToken");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (token && userDetails) {
      setIsAuthenticated(true); // User is logged in
      setUsername(userDetails.username || "User"); // Set username from localStorage
    } else {
      setIsAuthenticated(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    setIsAuthenticated(false); // Update the state
    router.push("/"); // Redirect to login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Freno Business</div>
      <div className={styles.navLinks}>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Home
          </a>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            About
          </a>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Services
          </a>
          <div className={styles.dropdown}>
            <ul>
              <li>
                <a href="#" className={styles.dropdownLink}>
                  Consulting
                </a>
              </li>
              <li>
                <a href="#" className={styles.dropdownLink}>
                  Development
                </a>
              </li>
              <li>
                <a href="#" className={styles.dropdownLink}>
                  Design
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Products
          </a>
          <div className={styles.dropdown}>
            <ul>
              <li>
                <a href="#" className={styles.dropdownLink}>
                  Software
                </a>
              </li>
              <li>
                <a href="#" className={styles.dropdownLink}>
                  Hardware
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Contact
          </a>
        </div>
      </div>

      <div className={styles.authButtons}>
        {isAuthenticated ? (
          <div className={styles.userMenu}>
            <div className={styles.username}>{username}</div>
            <div className={styles.dropdownMenu}>
              <ul>
                <li>
                  <a href="/profile" className={styles.dropdownLink}>Profile</a>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <a href="/signup" className={styles.signupBtn}>
              Sign Up
            </a>
            <a href="/login" className={styles.loginBtn}>
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
