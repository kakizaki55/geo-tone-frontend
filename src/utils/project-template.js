import { globalParams } from '@utils/tone-constants.js';

const { volume, fx, bpm } = globalParams;

const projectTemplate = {
  bpm: bpm.default,
  volume: volume.default,
  channels: [
    {
      id: self.crypto.randomUUID(),
      type: 'monoSynth',
      osc: 'triangle',
      steps: [null, null, null, null, null, null, null, null],
      volume: volume.default,
      reverb: fx.default,
    },
  ],
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
      volume: volume.default,
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
      volume: volume.default,
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
      volume: volume.default,
    },
  ],
};

export default projectTemplate;
