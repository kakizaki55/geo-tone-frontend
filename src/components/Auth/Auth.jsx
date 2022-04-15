import React from 'react';

export default function Auth({ isRegistering = false }) {
  console.log('isRegistering', isRegistering);
  return <div>{isRegistering ? 'registering' : 'logging in'}</div>;
}
