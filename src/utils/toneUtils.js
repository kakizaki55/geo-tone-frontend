// global data for sequencer

const keyCMajorPentatonic4 = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const keyCMajorPentatonic3 = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4'];
const keyCMajorPentatonic2 = ['C2', 'D2', 'E2', 'G2', 'A2', 'C3'];

const oscillators = ['triangle', 'sine', 'square'];

const sequencerInstrumentTypes = [
  'choose your sound',
  'duoSynth',
  'monoSynth',
  'membraneSynth',
];

const pianoInstrumentTypes = [
  'amSynth',
  'duoSynth',
  'fmSynth',
  'membraneSynth',
  'monoSynth',
  'pluckSynth',
];

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
  'C4',
];

export {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
  oscillators,
  sequencerInstrumentTypes,
  pianoInstrumentTypes,
  pianoChromaticScale,
  pianoEffectTypes,
};
