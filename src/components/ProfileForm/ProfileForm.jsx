import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../context/UserContext';
import { createProfile, updateProfile } from '../../services/profiles';
import styles from './ProfileForm.css';

export default function ProfileForm({ isEditing = false }) {
  const { formState, formMessage, handleFormChange, setFormMessage } = useForm({
    bio: '',
    avatar: '',
  });
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // If the user is editing an existing profile:
    if (isEditing) {
      try {
        const profile = await updateProfile(currentUser.username, formState);
        if (profile.username) {
          navigate(`/user/${profile.username}`, { push: true });
        } else {
          setFormMessage('Could not update your profile. Try again later.');
        }
      } catch (error) {
        setFormMessage(
          'Something went wrong editing your profile. Try again later.'
        );
        throw new Error(error);
      }

      // If the user is creating their profile for the first time:
    } else {
      try {
        const profile = await createProfile(formState);
        if (profile.username) {
          navigate(`/user/${profile.username}`, { push: true });
        } else {
          setFormMessage('User profile already exists.');
        }
      } catch (error) {
        setFormMessage(
          'Something went wrong creating your profile. Try again later.'
        );
        throw new Error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.profileForm}>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formState.bio}
            onChange={(e) => handleFormChange(e)}
            required
          />
        </label>
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
          <button>{isEditing ? 'Save' : 'Create'}</button>
          {formMessage}
        </div>
      </form>
    </>
  );
}
