import { globalParams, keys } from '@utils/tone-constants.js';

const { volume, fx, bpm } = globalParams;

const projectTemplate = {
  bpm: bpm.default,
  volume: volume.min,
  sequencer: {
    channels: [
      {
        id: self.crypto.randomUUID(),
        type: 'monoSynth',
        osc: 'triangle',
        steps: [null, null, null, null, null, null, null, null],
        volume: volume.min,
        // TODO: replace with FX rack
        fx: {
          freeverb: fx.max,
        },
      },
    ],
  },
  drums: [
    {
      type: 'high-hat',
      steps: [
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
        'C3',
      ],
      volume: volume.min,
    },
    {
      type: 'snare',
      steps: [
        null,
        null,
        'C3',
        null,
        null,
        null,
        'C3',
        null,
        null,
        null,
        'C3',
        null,
        null,
        null,
        'C3',
        null,
      ],
      volume: volume.min,
    },
    {
      type: 'kick',
      steps: [
        'C3',
        null,
        null,
        null,
        'C3',
        null,
        null,
        null,
        'C3',
        null,
        null,
        null,
        'C3',
        null,
        null,
        null,
      ],
      volume: volume.min,
    },
  ],
  piano: {
    volume: volume.min,
    steps: keys.pianoChromatic,
    fx: {
      autoFilter: fx.default,
      autoPanner: fx.default,
      autoWah: fx.default,
      bitCrusher: fx.default,
      distortion: fx.default,
      feedbackDelay: fx.default,
      freeverb: fx.default,
      panVol: fx.default,
      tremolo: fx.default,
    },
  },
};

export default projectTemplate;
