import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Projects from '../../components/Profile/Projects/Projects';
import User from '../../components/Profile/User/user';
import { findProfileByUsername } from '../../services/profiles';
import { createNewProjectByUserId } from '../../services/project';
import { useUser } from '../../context/UserContext';
import styles from './Profile.css';
import { deleteUser } from '../../services/users';

// BACKEND CONNECTION

// button that says create project
//  POST to projects
//  res from POST = { projectId }
//  redirect to="/project/${projectId}"
//
// DELETE user

export default function Profile() {
  const { username } = useParams();
  const { currentUser, setCurrentUser } = useUser();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/user/new', { push: true });
  };
  const handleEditProfile = () => {
    navigate(`/user/${username}/edit`, { push: true });
  };
  const handleCreateNewProject = async () => {
    const project = await createNewProjectByUserId();
    if (project.projectId) {
      navigate(`/project/${project.projectId}`, { push: true });
    }
  };
  const handleDeleteUser = async () => {
    if (confirm('Are you suuuuuuuuure?')) {
      const resp = await deleteUser(currentUser.userId);
      if (resp.message) {
        setCurrentUser({});
        navigate('/', { push: true });
      }
      console.log('resp', resp);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await findProfileByUsername(username);
        setUserProfile(data);
      } catch (error) {
        setUserProfile({}); // TODO: Do we need this fallback?
        throw new Error(error);
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
          Hey bud, gotta make a profile // TODO: Michelle doesn't want this AT
          ALL
          <button onClick={handleCreateProfile}>Create Profile</button>
        </>
      ) : (
        <div className={styles.cont}>
          <User styles={styles} userProfile={userProfile} />
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleCreateNewProject}> Create New Project</button>
          <Projects
            isCurrentUser={username === currentUser.username}
            userProfile={userProfile}
          />
          <button onClick={handleDeleteUser}>Delete Account</button>
        </div>
      )}
    </>
  );
}
