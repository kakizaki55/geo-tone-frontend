import { NavLink } from 'react-router-dom';
import styles from './Header.css';

export default function Header() {
  return (
    <header>
      <NavLink className={styles.title} to="/">
        GEo TONe
      </NavLink>
      <div>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </header>
  );
}
