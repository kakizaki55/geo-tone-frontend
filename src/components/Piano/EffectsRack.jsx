
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

  const style = {
    margin: "20%",
    height: "100px",
    fontFamily: "Arial",
    color: "white" // Sets font color of value and knob name
  };

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
              <label>
                  <Dial
                  type={type}
                  fx={fx}
                  handleEffectsRackChange={handleEffectsRackChange}/>
                  {type}
              </label>
            </div>)
          }) }
      </div>
    </>
  )
}

export default EffectsRack