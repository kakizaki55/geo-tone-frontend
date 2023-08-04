import Channel from './Channel';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './Sequencer.css';

const Sequencer = (props) => {
  const { project, handleAddChannel, setAddingChannel, addingChannel } = props;

  return (
    <div className={styles.sequencerContainer}>
      {project.channels.map((channel) => (
        <Channel key={`channel-${channel.id}`} channel={channel} />
      ))}
      {addingChannel ? (
        <Dropdown instrument="sequencer" handleAddChannel={handleAddChannel} />
      ) : (
        <button
          onClick={() => setAddingChannel(true)}
          className={styles.addChannel}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Sequencer;
