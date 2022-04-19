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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/user/new', { push: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await findProfileByUsername(username);
        setUserProfile(data);
      } catch (error) {
        setUserProfile({});
      }
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div>loading...</div>;

  return (
    <>
      {!userProfile.username ? (
        <>
          Hey bud, gotta make a profile // TODO: Michelle doesn't want this
          <button onClick={handleCreateProfile}>Create Profile</button>
        </>
      ) : (
        <User userProfile={userProfile} />
      )}
    </>
  );
}
