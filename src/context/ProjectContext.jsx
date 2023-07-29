import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
let uuid = self.crypto.randomUUID();

const defaultProject = {
  bpm: 120,
  volume: -6,
  channels: [
    { id: uuid, type: 'synth', osc: 'sine', steps: [null, null, null, null, null, null, null, null], volume: '-6', reverb: '0.5' },
  ],
};

function projectReducer(project, action) {
  switch (action.type) {
    case 'update song BPM':
      return { ...project, bpm: Number(action.value) };
    case 'add new channel':
      return { ...project, channels: [...project.channels, action.value] };
    case 'delete channel':
      return { ...project, channels: action.value };
    case 'update channels':
      return { ...project, channels: action.value };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [addingChannel, setAddingChannel] = useState(false);
  const [channelArray, setChannelArray] = useState([]);

  const [project, dispatch] = useReducer(projectReducer, defaultProject);

  useEffect(() => {
      setChannelArray(project.channels);
      setIsLoading(false);
  }, []);

  const handleSongBPM = (e) => {
    dispatch({ type: 'update song BPM', value: e.target.value });
  };

  const handleAddChannel = (e) => {
    const newChannel = {
      id: uuid,
      type: e.target.value,
      osc: 'sine',
      steps: [null, null, null, null, null, null, null, null],
      volume: -6,
      reverb: 0.5,
    };
    dispatch({
      type: 'add new channel',
      value: newChannel,
    });
    setChannelArray((prevState) => [...prevState, newChannel]);
    setAddingChannel(false);
  };

  const handleDeleteChannel = (channelId) => {
    const newChannelArray = channelArray.filter((item) => {
      if (item.id !== channelId) {
        return item;
      }
    });
    setChannelArray(newChannelArray);
    dispatch({ type: 'delete channel', value: newChannelArray });
  };

  const handleUpdateChannel = (channel) => {
    const newChannelArray = channelArray.map((item) => {
      if (item.id === channel.id) {
        return channel;
      } else {
        return item;
      }
    });
    setChannelArray(newChannelArray);

    dispatch({
      type: 'update channels',
      value: newChannelArray,
    });
  };

  const contextValue = {
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleSongBPM,
    handleAddChannel,
    handleDeleteChannel,
    handleUpdateChannel,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
};

export { ProjectProvider, useProject };
