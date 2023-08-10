import styles from './Piano.css'

const Faders = (props) => {
  const { envelope, setEnvelope } = props
  return (
  <>
    <div className={styles.faders}>
      <label>
        Attack
          <input
          id={`piano-$-attack`}
          name={`piano-attack`}
          type="range"
          min="0"
          max="100"
          value={envelope.attack* 100}
          onChange={(e) => setEnvelope({ ...envelope , attack: e.target.value/100 })}
          />
      </label>
    </div>
    <div className={styles.faders}>
      <label>
        Decay
          <input
          id={`piano-$-decay`}
          name={`piano-decay`}
          type="range"
          min="0"
          max="100"
          value={envelope.decay*100}
          onChange={(e) => setEnvelope({ ...envelope , decay: e.target.value/100})}
          />
      </label>
    </div>
    <div className={styles.faders}>
      <label>
        Sustain
          <input
          id={`piano-$-sustain`}
          name={`piano-sustain`}
          type="range"
          min="0"
          max="100"
          value={envelope.sustain*100}
          onChange={(e) => setEnvelope({ ...envelope , sustain: e.target.value/100 })}
          />
      </label>
    </div>
    <div className={styles.faders}>
      <label>
        Release
          <input
          id={`piano-$-release`}
          name={`piano-release`}
          type="range"
          min="0"
          max="100"
          value={envelope.release*100}
          onChange={(e) => setEnvelope({ ...envelope , release: e.target.value/100 })}
          />
      </label>
    </div>
    </>
  )
}

export default Faders