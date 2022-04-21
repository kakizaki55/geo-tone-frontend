import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function PrivateRoute({ children, routeProps }) {
  const { currentUser, loading } = useUser();
  if (loading) return <div>...loading</div>;
  if (!currentUser.username && !loading)
    return (
      <Navigate
        replace
        to={{ pathname: '/register', state: { from: location } }}
      />
    );
  return children;
}
