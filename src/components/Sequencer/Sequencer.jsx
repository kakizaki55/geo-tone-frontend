import { Song } from 'reactronica';
import GlobalControls from '../Controls/GlobalControls';
import Channel from '../Channel/Channel';
import Dropdown from '../Channel/Dropdown';
import styles from './Sequencer.css';


const Sequencer = (props) => {
  const {
    start,
    volume,
    setStart,
    setVolume,
    project,
    handleAddChannel,
    setAddingChannel,
    addingChannel } = props

  return (
    <div className={styles.sequencerContainer}>
          <Song isPlaying={start} bpm={project.bpm} volume={volume}>
            <GlobalControls
              start={start}
              setStart={setStart}
              volume={volume}
              setVolume={setVolume}
            />
            {
            project.channels.map((channel) => (
              <>
                <Channel key={`channel-${channel.id}`} channel={channel} />
              </>
            ))}
          </Song>

          {addingChannel ? (
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