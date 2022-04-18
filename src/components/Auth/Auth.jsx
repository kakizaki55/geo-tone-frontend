import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './Auth.css';
import { registerUser, signInUser } from '../../services/users';

export default function Auth({ isRegistering = false }) {
  const { formState, formError, handleFormChange, setFormError } = useForm();

  console.log('isRegistering', isRegistering);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      registerUser(formState.username, formState.password);
    } else {
      signInUser(formState.username, formState.password);
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
