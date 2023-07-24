import { useState, useMemo} from "react";
import { Instrument, Track } from "reactronica"
import styles from './Piano.css'
import {pianoChromaticScale } from "../../utils/toneUtils";
import Dropdown from "./DropDown"

const Piano = () => {
  const [volume, setVolume] = useState(-3);
  const [notes, setNotes] =useState(null)
  const [instrumentType, setInstrumentType] = useState()



  // const handleButtonClick = (event) => {
  //   // console.log('e.target.value', event.target.value)
  // }

  const handleChangeType = (e) => {
    console.log('e.target.value', e.target.value)
    setInstrumentType(e.target.value)
  }

return (
  <div className={styles.pianoContainer}>
    <Track volume={-6}>
      <Dropdown handleChangeType={handleChangeType}></Dropdown>
      <Instrument
        type={instrumentType}
        notes={notes}
      >
      </Instrument>
      { pianoChromaticScale.map((note) => (
        <button
          key={`piano-${note}`}
          onMouseDown={() => setNotes([{ name: note }])}
          onMouseUp={() => setNotes(null)}
          value={note}
          className={ (note.length === 2 ) ? styles.pianoKeyWhite : styles.pianoKeyBlack}
        >
          {note}
        </button>
      ))}
    </Track>
  </div>
  )
}

export default Piano