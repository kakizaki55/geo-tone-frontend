export default function User({ userProfile, styles }) {
  const { username, avatar, bio } = userProfile;
  return (
    <div className={styles.userProfile}>
      <h2>{username}</h2>
      <img src={avatar} alt="user avatar" />
      <span>{bio}</span>
    </div>
  );
}
