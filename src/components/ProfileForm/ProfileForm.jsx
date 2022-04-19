import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { createProfile } from '../../services/profiles';
import styles from './ProfileForm.css';

export default function ProfileForm({ isEditing = false }) {
  // TODO: REFACTOR THIS STATE INTO THE VIEW COMPONENT?
  // pass down to form as props?
  const { formState, formMessage, handleFormChange, setFormMessage } =
    useForm();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const profile = await createProfile(formState);
      if (profile.username) {
        navigate(`/user/${profile.username}`, { push: true });
      } else {
        setFormMessage('User profile already exists');
      }
    } catch (error) {
      setFormMessage('something went wrong'); // TODO: write clearer error message
      throw new Error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.profileForm}>
        <label>
          Bio:
          <input
            type="text"
            name="bio"
            value={formState.bio}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        {/* maybe refactor to a file upload system? */}
        <label>
          Avatar Url:
          <input
            type="text"
            name="avatar"
            value={formState.avatar}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        <button>{isEditing ? 'edit' : 'create'}</button>
        {formMessage}
      </form>
    </>
  );
}
