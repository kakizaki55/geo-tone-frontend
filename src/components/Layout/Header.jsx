import React from 'react';
import { useUser } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../../services/users';

export default function Header() {
  // get username from context (or whereever user is stored)
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = async () => {
    await logOutUser();
    setCurrentUser({});
  };

  return (
    <header>
      <NavLink to="/">GeoTone</NavLink>
      {!currentUser.username && <NavLink to="/register">Register</NavLink>}
      {!currentUser.username && <NavLink to="/signin">Sign In</NavLink>}
      {/* // pass user into path as template literals to access the logged in users
      //profile. */}
      <NavLink to={`/user/${currentUser.username}`}>Profile</NavLink>
      {currentUser.username && <button onClick={handleLogout}>Log Out</button>}
    </header>
  );
}
