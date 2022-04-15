import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  // get username from context (or whereever user is stored)
  return (
    <header>
      <NavLink to="/">GeoTone</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      {/* // pass user into path as template literals to access the logged in users
      //profile. */}
      <NavLink to="/user/space-lady">Profile</NavLink>
    </header>
  );
}
