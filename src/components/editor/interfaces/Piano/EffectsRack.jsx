
import styles from './Piano.css'
import Dial from './Dial'

const EffectsRack = (props) => {
  const {
    volume,
    setVolume,
    fx,
    pianoEffectTypes,
    handleEffectsRackChange
  } = props

  return (
    <>
      <label>
          volume
            <input
            id={`piano-$-volume`}
            name={`piano-volume`}
            type="range"
            min="-40"
            max="0"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            />
        </label>
      <div
      className={styles.effectsRack}>
        { pianoEffectTypes.map((type) => {
          return (
            <div
            key={`piano-${type}`}>
                  <Dial
                  className={styles.dialLabel}
                  type={type}
                  fx={fx}
                  handleEffectsRackChange={handleEffectsRackChange}/>
                  <p>
                    {type}
                  </p>
            </div>)
          }) }
      </div>
    </>
  )
}

export default EffectsRack