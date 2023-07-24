import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { logOutUser } from '../../services/users';
import styles from './Layout.css';
import home from '../../../public/assets/home.png';

export default function Header() {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    setCurrentUser({});
    navigate(`/`, { push: true });
  };

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
