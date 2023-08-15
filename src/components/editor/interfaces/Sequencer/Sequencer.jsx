import { AddTrack, Channel, Dropdown } from '@components/editor/controls';
import { useProject } from '@context/ProjectContext.jsx';
import styles from './Sequencer.css';

const Sequencer = () => {
  const { project, handleAddChannel, setAddingChannel, addingChannel } =
    useProject();

  return (
    <div className={styles.sequencerContainer}>
      {/* CHANNELS ARRAY */}
      {project.channels.map((channel) => (
        <Channel key={`channel-${channel.id}`} channel={channel} />
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

export default Sequencer;
