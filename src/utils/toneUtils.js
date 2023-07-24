// global data for sequencer
import styles from '../components/Channel/Channel.css';

const keyCMajorPentatonic4 = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const keyCMajorPentatonic3 = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'];
const keyCMajorPentatonic2 = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3'];

const oscillators = ['triangle', 'sine', 'square'];

const sequencerInstrumentsTypes = [
  'choose your sound',
  'duoSynth',
  'monoSynth',
  'membraneSynth',
];

const pianoInstrumentType = [
  'amSynth',
  'duoSynth',
  'fmSynth',
  'membraneSynth',
  'monoSynth',
  'pluckSynth',
]

const pianoChromaticScale = ['C3','C#3', 'D3','D#3', 'E3','F3','F#3', 'G3','G#3', 'A3','A#3','C4']

const setPitchColor = (string) => {
  return {
    [styles.C]: string?.includes('C'),
    [styles.D]: string?.includes('D'),
    [styles.E]: string?.includes('E'),
    [styles.G]: string?.includes('G'),
    [styles.A]: string?.includes('A'),
  };
};

export {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
  oscillators,
  sequencerInstrumentsTypes,
  pianoInstrumentType,
  pianoChromaticScale,
  setPitchColor,
};
