import React from 'react';

export default function Auth({ isRegistering = false }) {
  // BACKEND CONNECTION
  // if isRegistering
  // POST to users and profiles
  // else
  // POST/PATCH??
  console.log('isRegistering', isRegistering);
  return <div>{isRegistering ? 'registering' : 'logging in'}</div>;
}
