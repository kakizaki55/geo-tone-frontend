export default function User({ userProfile }) {
  const { username, avatar, bio } = userProfile;
  return (
    <div className={styles.user}>
      <h2>{username}</h2>
      <img src={avatar} alt="user avatar" />
      <span>{bio}</span>
    </div>
  );
}
