import { synthTypes } from '@utils/tone-constants.js';
import styles from './Dropdown.css';

const Dropdown = ({ instrument, handleChange }) => {
  if (!synthTypes[instrument])
    return <Dropdown instrument="default" handleChange={handleChange} />;

  return (
    <select onChange={handleChange} className={styles.select}>
      <option value="">choose your sound</option>
      {synthTypes[instrument].map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
