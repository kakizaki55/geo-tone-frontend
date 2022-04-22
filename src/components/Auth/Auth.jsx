import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../context/UserContext';
import { getUser, registerUser, signInUser } from '../../services/users';
import styles from './Auth.css';

export default function Auth({ isRegistering = false }) {
  const { formState, formMessage, handleFormChange, setFormMessage } = useForm({
    username: '',
    password: '',
  });

  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const containsIllegalCharacters = (str) => {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    // If a new user is registering:
    if (isRegistering) {
      if (containsIllegalCharacters(formState.username)) {
        setFormMessage('username must contain only letters and numbers');
      } else {
        const user = await registerUser(formState.username, formState.password);

        if (user.message === 'username already exists') {
          setFormMessage(user.message);
        } else if (user?.username) {
          setFormMessage('You have successfully registered! Logging you in...');

          await signInUser(formState.username, formState.password);
          setCurrentUser({ username: user.username, userId: user.userId });

          setTimeout(() => {
            navigate(`/user/${formState.username}`, { push: true });
          }, 2000);
        }
      }

      // If an existing user is attempting signing in:
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
      <h1>{isRegistering ? 'rEGIsTer' : 'Log In'}</h1>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={(e) => handleFormChange(e)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={(e) => handleFormChange(e)}
          required
        />
      </label>
      <button>{isRegistering ? 'Register' : 'Log In'}</button>
      <p className={styles.alertMessage}>{formMessage}</p>
    </form>
  );
}
