import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './ProfileForm.css';

export default function ProfileForm({ isEditing = false }) {
  // REFACTOR THIS STATE INTO THE VIEW COMPONENT?
  // pass down to form as props?
  const { formState, formError, handleFormChange, setFormError } = useForm();
  console.log('formState', formState);
  // isEditing booleon is working as intended
  console.log('isEditing', isEditing);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const createProfile = async () => {
      try {
        const resp = await fetch(`${process.env.API_URL}/api/v1/profiles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
          credentials: 'include',
          mode: 'cors',
        });

        const parsedData = await resp.json();
        return parsedData;
      } catch (error) {
        throw new Error(error);
      }
    };

    createProfile();
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
