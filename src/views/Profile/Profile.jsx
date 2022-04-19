import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Projects from '../../components/Profile/Projects/Projects';
import User from '../../components/Profile/User/user';
import { findProfileByUsername } from '../../services/profiles';

// BACKEND CONNECTION

// button that says create project
//  POST to projects
//  res from POST = { projectId }
//  redirect to="/project/${projectId}"
//
// DELETE user

export default function Profile() {
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState({});

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/user/new', { push: true });
  };

  return (
    <>
      <User userProfile={userProfile} />
      <button onClick={handleCreateProfile}>Create Profile</button>
    </>
  );
}
