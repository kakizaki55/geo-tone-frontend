import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
// import { getUser } from '../../services/users';

export default function Header() {
  // get username from context (or whereever user is stored)
  const getUser = () => {
    const [cookies] = useCookies(['session']);
    console.log('cookies', cookies);
  };

  return (
    <header>
      <NavLink to="/">GeoTone</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      {/* // pass user into path as template literals to access the logged in users
      //profile. */}
      <NavLink to="/user/space-lady">Profile</NavLink>
      <button onClick={getUser}>getUser</button>
    </header>
  );
}
