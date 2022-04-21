import React from 'react';
import { useUser } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOutUser } from '../../services/users';
import styles from './Layout.css';
import home from '../../assets/home.png';

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
        <img src={home} />
      </NavLink>
      <NavLink to="/explore">Explore</NavLink>
      {!currentUser.username && <NavLink to="/register">Register</NavLink>}
      {!currentUser.username && <NavLink to="/signin">Sign In</NavLink>}
      {/* // pass user into path as template literals to access the logged in users
      //profile. */}
      {currentUser.username && (
        <div className={styles.loggedIn}>
          <p>Currently Logged in as: </p>
          <NavLink to={`/user/${currentUser.username}`}>
            {currentUser.username}
          </NavLink>
        </div>
      )}
      {currentUser.username && <button onClick={handleLogout}>Log Out</button>}
    </header>
  );
}
