import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/CompanyDetails.module.css"; // Updated CSS for styles

const CompanyDetails = () => {
  const router = useRouter();
  const { companyId } = router.query;  // Get companyId from URL

  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (companyId) {
      const fetchCompanyDetails = async () => {
        try {
          const response = await axios.get(`/api/company/${companyId}`);
          setCompany(response.data.company);
        } catch (error) {
          setError("Error fetching company details");
        }
      };

      fetchCompanyDetails();
    }
  }, [companyId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!company) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.companyDetails}>
      <header className={styles.header}>
        <img 
          src={company.logo || "/default-logo.png"} 
          alt={company.name} 
          className={styles.logo} 
        />
        <h1 className={styles.companyName}>{company.name}</h1>
        <p className={styles.createdAt}>
          <strong>Created On:</strong> {new Date(company.createdAt).toLocaleDateString()}
        </p>
      </header>

      <nav className={styles.navMenu}>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div id="overview" className={styles.body}>
        <h2>Company Overview</h2>
        <p><strong>Description:</strong> {company.description}</p>
      </div>

      <div id="services" className={styles.body}>
        <h2>Our Services</h2>
        <p><strong>Service details here...</strong></p>
      </div>

      <div id="contact" className={styles.body}>
        <h2>Contact Us</h2>
        <p><strong>Email:</strong> {company.email || "info@company.com"}</p>
        <p><strong>Phone:</strong> {company.phone || "+123 456 7890"}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
