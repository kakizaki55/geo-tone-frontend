// global data for sequencer
import styles from '../components/Channel/Channel.css';

const keyCMajorPentatonic4 = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const keyCMajorPentatonic3 = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'];
const keyCMajorPentatonic2 = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3'];

const oscillators = ['triangle', 'sine', 'square'];

const instruments = ['', 'duoSynth', 'membraneSynth', 'monoSynth'];

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
  instruments,
  setPitchColor,
};
