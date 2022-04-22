export default function User({ userProfile, styles }) {
  const { username, avatar, bio } = userProfile;
  return (
    <div className={styles.userProfile}>
      <h1>{username}</h1>
      <img src={avatar} alt={`${username}'s avatar`} />
      <span>{bio}</span>
    </div>
  );
}
