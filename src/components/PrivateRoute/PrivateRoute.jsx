import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function PrivateRoute({ children, routeProps }) {
  const { currentUser } = useUser();
  return currentUser.username ? (
    children
  ) : (
    <Navigate
      replace
      to={{ pathname: '/register', state: { from: location } }}
    />
  );
}
