import { useReducer, useState } from 'react';
import { globalParams } from '@utils/tone-constants.js';
import { AddTrack, Channel, Dropdown } from '@components/editor/controls';
import { useProject } from '@context/ProjectContext.jsx';
import styles from './Sequencer.css';

const Sequencer = () => {
  const { project } = useProject();

  const [channels, dispatch] = useReducer(
    sequencerReducer,
    project.sequencer.channels
  );
  const [addingChannel, setAddingChannel] = useState(false);

  const handleAddChannel = (e) => {
    dispatch({
      type: 'add new channel',
      id: self.crypto.randomUUID(),
      synthType: e.target.value,
    });

    setAddingChannel(false);
  };

  const handleUpdateChannel = (channel) => {
    dispatch({
      type: 'update channels',
      task: channel,
    });
  };

  const handleDeleteChannel = (channel) => {
    dispatch({ type: 'delete channel', id: channel.id });
  };

  return (
    <div className={styles.sequencerContainer}>
      {/* CHANNELS ARRAY */}
      {channels.map((channel) => (
        <Channel
          key={`channel-${channel.id}`}
          channel={channel}
          handleUpdate={handleUpdateChannel}
          handleDelete={handleDeleteChannel}
        />
      ))}

      {/* CONDITIONALLY DISPLAY ADD BUTTON OR DROPDOWN */}
      {addingChannel ? (
        <Dropdown instrument="sequencer" handleChange={handleAddChannel} />
      ) : (
        <AddTrack handleClick={() => setAddingChannel(true)} />
      )}
    </div>
  );
};

function sequencerReducer(channels, action) {
  const { volume, fx } = globalParams;

  switch (action.type) {
    case 'add new channel':
      return [
        ...channels,
        {
          id: action.id,
          type: action.synthType,
          osc: 'triangle',
          steps: [null, null, null, null, null, null, null, null],
          volume: volume.min,
          fx: {
            reverb: fx.max,
          },
        },
      ];
    case 'update channels': {
      return channels.map((channel) => {
        if (channel.id === action.task.id) {
          return action.task;
        } else {
          return channel;
        }
      });
    }
    case 'delete channel': {
      return channels.filter((channel) => {
        return channel.id !== action.id;
      });
    }
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export default Sequencer;
