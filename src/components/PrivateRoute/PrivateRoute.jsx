import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function PrivateRoute({ children, routeProps }) {
  const { currentUser } = useUser();
  console.log('currentUser', currentUser);
  return currentUser.username ? (
    children
  ) : (
    <Navigate
      replace
      to={{ pathname: '/register', state: { from: location } }}
    />
  );
}
