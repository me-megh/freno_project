import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // For making API requests
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [companies, setCompanies] = useState([]);
const API_URL = process.env.NEXT_PUBLIC_API_URL|| 'http://localhost:3000';
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userId = userDetails ? userDetails.id : null;

    if (!userId) {
      console.error("User ID not found in localStorage!");
      return; // Exit if no userId found
    }

    if (token && userDetails) {
      setIsAuthenticated(true);
      setUsername(userDetails.username || "User");

      // Fetch accessible companies after user is authenticated
      const fetchCompanies = async () => {
        try {
          // Use GET request to fetch companies
          const response = await axios.get(`${API_URL}/api/user/companies`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId: userId, // Pass userId as query parameter
            },
          });

          setCompanies(response.data.companies); // Store the companies in state
          localStorage.setItem(
            "userCompanies",
            JSON.stringify(response.data.companies)
          ); // Store in localStorage
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      };

      fetchCompanies();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userCompanies"); // Clear companies from localStorage
    setIsAuthenticated(false);
    router.push("/login");
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

        {/* Companies Dropdown */}
        <div className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Companies
          </a>
          <div className={styles.dropdown}>
            <ul>
              {companies.map((company) => (
                <li key={company.companyId._id}>
                  <a
                    href={`${API_URL}/company/${company.companyId._id}`} 
                    className={styles.dropdownLink}
                  >
                    {company.companyId.name}
                  </a>
                </li>
              ))}
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
                  <a href="/profile" className={styles.dropdownLink}>
                    Profile
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                  </button>
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
