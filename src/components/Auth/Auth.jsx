import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './Auth.css';

export default function Auth({ isRegistering = false }) {
  // BACKEND CONNECTION
  // if isRegistering

  // else
  // POST/PATCH??
  const { formState, formError, handleFormChange, setFormError } = useForm();

  console.log('isRegistering', isRegistering);

  const handleAuthSubmit = () => {
    if (isRegistering) {
      // Create account (user and profile)
      // POST to users and profiles
    } else {
      // Log In
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleAuthSubmit}>
      <h2>{isRegistering ? 'Register' : 'Log In'}</h2>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={(e) => handleFormChange(e)}
        />
      </label>
      {/* maybe refactor to a file upload system? */}
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={formState.password}
          onChange={(e) => handleFormChange(e)}
        />
      </label>
      <button>{isRegistering ? 'Register' : 'Log In'}</button>
    </form>
  );
}
