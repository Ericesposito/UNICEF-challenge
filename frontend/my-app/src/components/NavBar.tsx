import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
