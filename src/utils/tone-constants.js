// global data for sequencer
import styles from '@components/editor/controls/Channel/Channel.css';

const globalParams = {
  volume: {
    default: '-12',
    min: -60, // no standard decibel minimum could be identified; -60 dB is arbitrary (JL)
    max: 0,
    step: 1,
  },
  fx: {
    default: 0.0,
    min: 0.0,
    max: 1.0,
    step: 0.05,
  },
  bpm: {
    default: 120,
    min: 60,
    max: 360,
    step: 4,
  },
};

const keys = {
  CMajorPentatonic2: ['C2', 'D2', 'E2', 'G2', 'A2', 'C3'],
  CMajorPentatonic3: ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'],
  CMajorPentatonic4: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'],
  pianoChromatic: [
    'C3',
    'C#3',
    'D3',
    'D#3',
    'E3',
    'F3',
    'F#3',
    'G3',
    'G#3',
    'A3',
    'A#3',
    'B3',
    'C4',
    'C#4',
    'D4',
    'D#4',
    'E4',
    'F4',
  ],
};

const oscillators = ['triangle', 'sine', 'square'];

const synthTypes = {
  sequencer: ['duoSynth', 'monoSynth', 'membraneSynth'],
  piano: [
    'amSynth',
    'duoSynth',
    'fmSynth',
    'membraneSynth',
    'monoSynth',
    'pluckSynth',
  ],
  all: [
    'amSynth',
    'duoSynth',
    'fmSynth',
    'membraneSynth',
    'metalSynth',
    'monoSynth',
    'pluckSynth',
    'sampler',
    'synth',
  ],
  default: ['duoSynth', 'monoSynth', 'membraneSynth'],
};

const fxTypes = [
  'autoFilter',
  'autoPanner',
  'autoWah',
  'bitCrusher',
  'distortion',
  'feedbackDelay',
  'freeverb',
  'panVol',
  'tremolo',
];

// ! Deprecated - use fxTypes instead
const pianoEffectTypes = [
  'autoFilter',
  'autoPanner',
  'autoWah',
  'bitCrusher',
  'distortion',
  'feedbackDelay',
  'freeverb',
  'panVol',
  'tremolo',
];

// ! Deprecated - use keys.CMajorPentatonic[#] instead
const keyCMajorPentatonic4 = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const keyCMajorPentatonic3 = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'];
const keyCMajorPentatonic2 = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3'];

// ! Deprecated - use synthTypes.sequencer instead
const sequencerInstrumentsTypes = [
  'choose your sound',
  'duoSynth',
  'monoSynth',
  'membraneSynth',
];

// ! Deprecated - use synthTypes.piano instead
const pianoInstrumentType = [
  'amSynth',
  'duoSynth',
  'fmSynth',
  'membraneSynth',
  'monoSynth',
  'pluckSynth',
];

// ! Deprecated - use keys.pianoChromatic instead
const pianoChromaticScale = [
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
];

// TODO: move tonejs utility function to interface-utils

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
  globalParams,
  keys,
  oscillators,
  synthTypes,
  fxTypes,
  setPitchColor,
  // ! Items below are deprecated - check above for alternatives
  pianoEffectTypes,
  keyCMajorPentatonic4,
  keyCMajorPentatonic3,
  keyCMajorPentatonic2,
  pianoChromaticScale,
  pianoInstrumentType,
  sequencerInstrumentsTypes,
};
