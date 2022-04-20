import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './Auth.css';
import { getUser, registerUser, signInUser } from '../../services/users';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Auth({ isRegistering = false }) {
  const { formState, formMessage, handleFormChange, setFormMessage } = useForm({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  const onlyLettersAndNumbers = (str) => {
    return /[A-Za-z0-9]g/.test(str);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (!onlyLettersAndNumbers(formState.username)) {
        setFormMessage('usernames can only contain lettes and numbers');
      } else if (user?.username) {
        const user = await registerUser(formState.username, formState.password);
        setFormMessage('you are registered');
        navigate(`/signin`, { push: true });
      } else if (user.message === 'username already exists') {
        setFormMessage(
          'that username is already taken. please choose a different username.'
        );
      }
    } else {
      const { message } = await signInUser(
        formState.username,
        formState.password
      );
      const user = await getUser();
      setCurrentUser({ username: user.username, userId: user.userId });
      setFormMessage(message);
      navigate(`/user/${formState.username}`, { push: true });
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
          type="password"
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
