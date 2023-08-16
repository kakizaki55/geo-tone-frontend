import { useReducer } from 'react';
import { useProject } from '@context/ProjectContext';
import { DrumChannel } from '@components/editor/controls';
import styles from './DrumMachine.css';

const DrumMachine = () => {
  const { project } = useProject();

  const [drums, dispatch] = useReducer(drumsReducer, project.drums);

  const handleUpdateDrum = (drum) => {
    dispatch({
      type: 'update a drum channel',
      task: drum,
    });
  };

  return (
    <div className={styles.drumMachineContainer}>
      {drums.map((drum) => (
        <DrumChannel
          key={`drum-${drum.type}`}
          drum={drum}
          handleUpdate={handleUpdateDrum}
        />
      ))}
    </div>
  );
};

function drumsReducer(drums, action) {
  switch (action.type) {
    case 'update a drum channel': {
      return drums.map((channel) => {
        if (channel.type === action.task.type) {
          return action.task;
        } else {
          return channel;
        }
      });
    }
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export default DrumMachine;
