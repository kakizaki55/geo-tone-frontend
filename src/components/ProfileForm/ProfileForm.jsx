import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './ProfileForm.css';

export default function ProfileForm({ isEditing = false }) {
  const { formState, formError, handleFormChange, setFormError } = useForm();
  console.log('formState', formState);
  // isEditing booleon is working as intended
  console.log('isEditing', isEditing);

  const handleFormSubmit = () => {
    // this is where we send the Profile to the back end
    // if isEditing is true its a patch route instead of a post route
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
      </form>
    </>
  );
}
