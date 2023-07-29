import { NavLink } from 'react-router-dom';
import styles from './Layout.css';
import home from '../../../public/assets/home.png';

export default function Header() {

  return (
    <header>
      <NavLink to="/">
        <img src={home} alt="Geo Tone homepage" />
      </NavLink>
      <NavLink to="/create">Create</NavLink>
      <NavLink to="/about">About</NavLink>
    </header>
  );
}
