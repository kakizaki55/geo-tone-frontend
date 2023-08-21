import { NavLink } from 'react-router-dom';
import styles from './Header.css';

const Header = () => {
  return (
    <header>
      <nav className={styles.navigation}>
        <NavLink className={styles.logo} to="/">
          GEo TONe
        </NavLink>
        <div>
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
