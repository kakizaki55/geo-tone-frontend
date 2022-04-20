import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './Auth.css';
import { getUser, registerUser, signInUser } from '../../services/users';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Auth({ isRegistering = false }) {
  const { formState, formMessage, handleFormChange, setFormMessage } =
    useForm();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      const user = await registerUser(formState.username, formState.password);
      if (user?.username) {
        setFormMessage('You have successfully registered! Logging you in...');
        await signInUser(formState.username, formState.password);
        setCurrentUser({ username: user.username, userId: user.userId });
        // setFormMessage(message);
        setTimeout(() => {
          navigate(`/user/${formState.username}`, { push: true });
        }, 2000);
      }
    } else {
      const { message } = await signInUser(
        formState.username,
        formState.password
      );
      const user = await getUser();
      setCurrentUser({ username: user.username, userId: user.userId });
      setFormMessage(message);
      setTimeout(() => {
        navigate(`/user/${formState.username}`, { push: true });
      }, 2000);
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
      <div>{formMessage}</div>
    </form>
  );
}
