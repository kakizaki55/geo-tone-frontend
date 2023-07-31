import { NavLink } from 'react-router-dom';
import styles from './Layout.css';

export default function Header() {
  return (
    <header>
      <NavLink className={styles.logo} to="/">
        GEo TONe
      </NavLink>
      <div>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </header>
  );
}
