import styles from './EffectsRack.css';
import { Effect } from 'reactronica';
import { Dial } from '@components/editor/controls';

const EffectsRack = (props) => {
  const { fx, fxList, handleChange } = props;

  return (
    <div className={styles.effectsRack}>
      {fxList.map((type, index) => {
        return (
          <label key={`fx-rack-${index}`}>
            {type}
            <Dial type={type} handleChange={handleChange} />
            <Effect type={type} wet={fx[type]} />
          </label>
        );
      })}
    </div>
  );
};

export default EffectsRack;
