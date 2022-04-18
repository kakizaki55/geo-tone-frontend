import { useId } from 'react';
import { setPitchColor } from '../../utils/toneUtils';
import classNames from 'classnames';
import styles from './Channel.css';

export default function Row({ notes, handleNoteChange }) {
  return (
    <div className={styles.row}>
      {notes.map((note, index) => (
        // Consider the input type=number - scroll works to inc/dec values
        // OR input type=range

        <div
          id={`track-${index}`}
          className={classNames(styles.step, setPitchColor(note))}
          key={useId()}
          onClick={(e) => handleNoteChange(e)}
        >
          {note}
        </div>
      ))}
    </div>
  );
}
