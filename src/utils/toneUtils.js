// global data for sequencer
import styles from '../components/Channel/Channel.css';

const keyCMajorPentatonic = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'];

const oscillators = ['triangle', 'sine', 'square'];

const instruments = ['', 'duoSynth', 'membraneSynth', 'monoSynth', 'synth'];

const setPitchColor = (string) => {
  return {
    [styles.C]: string?.includes('C'),
    [styles.D]: string?.includes('D'),
    [styles.E]: string?.includes('E'),
    [styles.G]: string?.includes('G'),
    [styles.A]: string?.includes('A'),
  };
};

export { keyCMajorPentatonic, oscillators, instruments, setPitchColor };
