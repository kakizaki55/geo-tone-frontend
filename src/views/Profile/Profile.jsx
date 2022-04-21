import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Projects from '../../components/Profile/Projects/Projects';
import User from '../../components/Profile/User/User';
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
        <div className={styles.createProfile}>
          <h1>Create A Profile</h1>
          <p>Before you begin your audio adventure, please create a profile!</p>
          <button onClick={handleCreateProfile}>Click Here</button>
        </div>
      ) : (
        <div className={styles.cont}>
          <div className={styles.topSection}>
            <div className={styles.profileCont}>
              <User styles={styles} userProfile={userProfile} />
              <button onClick={handleEditProfile}>Edit Profile</button>
            </div>
            <button
              className={styles.createProject}
              onClick={handleCreateNewProject}
            >
              Create New Project
            </button>
          </div>
          <h3>Your Projects</h3>
          <Projects
            styles={styles}
            isCurrentUser={username === currentUser.username}
            userProfile={userProfile}
          />
          <button className={styles.deleteAccount} onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      )}
    </>
  );
}
