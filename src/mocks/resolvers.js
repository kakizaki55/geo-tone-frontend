const mockUser = {
  userId: '0',
  username: 'mockuser',
};

const mockProfile = {
  ...mockUser,
  bio: 'mock bio',
  avatar: 'mock url',
};

const mockProject = {
  userId: '0',
  title: 'untitled',
  bpm: 120,
  volume: -12,
  channels: [
    '{ "id": 0, "type": "synth", "osc": "sine", "steps": [null, null, null, null, null, null, null, null], "volume": -5, "reverb": 0.5 }',
  ],
  projectId: '0',
};

const mockMultipleProjects = [
  {
    userId: '0',
    title: 'mock and roll',
    bpm: 80,
    volume: 0,
    channels: [
      '{ "id": 0, "type": "synth", "osc": "sine", "steps": [null, null, null, null, null, null, null, null], "volume": -5, "reverb": 0.5 }',
    ],
    projectId: '0',
  },
  {
    userId: '1',
    title: 'ole mockeroo',
    bpm: 140,
    volume: -2,
    channels: [
      '{ "id": 0, "type": "synth", "osc": "sine", "steps": [null, null, null, null, null, null, null, null], "volume": -5, "reverb": 0.5 }',
    ],
    projectId: '1',
  },
];

export { mockUser, mockProfile, mockProject, mockMultipleProjects };
