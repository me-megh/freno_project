import React from 'react';
import styles from '../styles/megaMenu.module.css';

const MegaMenu = () => {
  return (
    <div className={styles.megaMenuWrapper}>
      <div className={styles.megaMenu}>
        <div className={styles.menuItem}>
          <h3 className={styles.menuTitle}>Services</h3>
          <div className={styles.dropdown}>
            <ul>
              <li className={styles.menuLink}>Consulting</li>
              <li className={styles.menuLink}>Design</li>
              <li className={styles.menuLink}>Development</li>
              <li className={styles.menuLink}>Strategy</li>
            </ul>
          </div>
        </div>

        <div className={styles.menuItem}>
          <h3 className={styles.menuTitle}>Products</h3>
          <div className={styles.dropdown}>
            <ul>
              <li className={styles.menuLink}>Software</li>
              <li className={styles.menuLink}>Hardware</li>
              <li className={styles.menuLink}>Tools</li>
              <li className={styles.menuLink}>Solutions</li>
            </ul>
          </div>
        </div>

        <div className={styles.menuItem}>
          <h3 className={styles.menuTitle}>About Us</h3>
          <div className={styles.dropdown}>
            <ul>
              <li className={styles.menuLink}>Company</li>
              <li className={styles.menuLink}>Team</li>
              <li className={styles.menuLink}>Careers</li>
              <li className={styles.menuLink}>Contact</li>
            </ul>
          </div>
        </div>

        {/* Additional Menu */}
        <div className={styles.menuItem}>
          <h3 className={styles.menuTitle}>Solutions</h3>
          <div className={styles.dropdown}>
            <ul>
              <li className={styles.menuLink}>Cloud Services</li>
              <li className={styles.menuLink}>AI Solutions</li>
              <li className={styles.menuLink}>Data Analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
