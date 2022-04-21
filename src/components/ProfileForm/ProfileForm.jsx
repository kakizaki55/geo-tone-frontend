import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { createProfile, updateProfile } from '../../services/profiles';
import styles from './ProfileForm.css';
import { useUser } from '../../context/UserContext';

export default function ProfileForm({ isEditing = false }) {
  // TODO: REFACTOR THIS STATE INTO THE VIEW COMPONENT?
  // pass down to form as props?
  const { formState, formMessage, handleFormChange, setFormMessage } = useForm({
    bio: '',
    avatar: '',
  });
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const profile = await updateProfile(currentUser.username, formState);
        if (profile.username) {
          navigate(`/user/${profile.username}`, { push: true });
        } else {
          setFormMessage('Could not update your profile');
        }
      } catch (error) {
        setFormMessage('something went wrong');
        throw new Error(error);
      }
    } else {
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
            required
          />
        </label>
        {/* maybe refactor to a file upload system? */}
        <label>
          Avatar Url:
          <input
            type="text"
            name="avatar"
            value={formState.avatar}
            placeholder="enter a URL"
            onChange={(e) => handleFormChange(e)}
            required
          />
        </label>
        <div>
          <button>{isEditing ? 'edit' : 'create'}</button>
          {formMessage}
        </div>
      </form>
    </>
  );
}
