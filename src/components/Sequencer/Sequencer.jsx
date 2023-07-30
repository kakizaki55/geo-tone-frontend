import Channel from '../Channel/Channel';
import Dropdown from '../Channel/Dropdown';
import styles from './Sequencer.css';


const Sequencer = (props) => {
  const {
    project,
    handleAddChannel,
    setAddingChannel,
    addingChannel } = props

  return (
    <div className={styles.sequencerContainer}>
      {
        project.channels.map((channel) => (
          <Channel key={`channel-${channel.id}`} channel={channel} />
        ))}
      { addingChannel ? (
        <Dropdown handleAddChannel={handleAddChannel} />
      ) : (
        <button
          onClick={() => setAddingChannel(true)}
          className={styles.addChannel}
        >
          +
        </button>
      )}
    </div>
  )
}

export default Sequencer