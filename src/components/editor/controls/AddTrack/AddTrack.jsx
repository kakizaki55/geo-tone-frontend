import styles from './AddTrack.css';

const AddTrack = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.plusButton}>
      +
    </button>
  );
};

export default AddTrack;
