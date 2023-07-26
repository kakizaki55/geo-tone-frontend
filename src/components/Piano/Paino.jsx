import styles from './Piano.css'
import { useState } from "react";
import { Instrument, Track, Effect} from "reactronica"
import { pianoChromaticScale } from "../../utils/toneUtils";
import { pianoEffectTypes } from "../../utils/toneUtils";
import Dropdown from "./DropDown"
import EffectsRack from "./EffectsRack"
import Knob from './Knob'

const Piano = () => {
  const [volume, setVolume] = useState(-3);
  const [fx, setFx] = useState({
    autoFilter:0,
    autoPanner:0,
    autoWah:0,
    bitCrusher:0,
    distortion:0,
    feedbackDelay:0,
    freeverb:0,
    panVol:0,
    tremolo:0})
  const [notes, setNotes] =useState(null)
  const [instrumentType, setInstrumentType] = useState(null)

  const handleChangeInstrumentType = (e) => {
    setInstrumentType(e.target.value)
  }

  const handleEffectsRackChange = (e) => {
    setFx({...fx, [e.target.name] : e.target.value} )
  }

return (
  <div className={styles.pianoContainer}>
    <div>
      <Dropdown handleChangeType={handleChangeInstrumentType}/>
      {/* <Faders envelope={envelope} setEnvelope={setEnvelope}/> */}
      <EffectsRack
        volume={volume}
        setVolume={setVolume}
        fx={fx}
        pianoEffectTypes={pianoEffectTypes}
        handleEffectsRackChange={handleEffectsRackChange}/>
    </div>
    {/* this is the sound generating part of the piano*/}
    <Track
      volume={volume}>
      <Instrument
        type={instrumentType}
        notes={notes}
      >
      </Instrument>
      {pianoEffectTypes.map((type)=> {
        return (
        <Effect
          key={`effect-${type}`}
          type={type}
          wet={fx[type]}/>)
      })}
    </Track>
    {/* this is the visual buttons of the of the piano*/}
    {pianoChromaticScale.map((note) => (
        <button
          key={`piano-${note}`}
          onMouseDown={() => setNotes([{ name: note }])}
          onMouseUp={() => setNotes(null)}
          value={note}
          className={ (note.length === 2 ) ? styles.pianoKeyWhite : styles.pianoKeyBlack }
        >
          {note}
        </button>
      ))}
  </div>
  )
}

export default Piano