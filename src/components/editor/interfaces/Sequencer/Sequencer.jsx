import { AddControl, Channel, Dropdown } from '@components/editor/controls';
import { useProject } from '@context/ProjectContext.jsx';
import styles from './Sequencer.css';

const Sequencer = () => {
  const { project, handleAddChannel, setAddingChannel, addingChannel } =
    useProject();

  return (
    <div className={styles.sequencerContainer}>
      {project.channels.map((channel) => (
        <Channel key={`channel-${channel.id}`} channel={channel} />
      ))}
      {addingChannel ? (
        <Dropdown instrument="sequencer" handleChange={handleAddChannel} />
      ) : (
        <AddControl handleClick={() => setAddingChannel(true)} />
      )}
    </div>
  );
};

export default Sequencer;
