import styles from './AddControl.css';

const AddControl = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.addChannel}>
      +
    </button>
  );
};

export default AddControl;
