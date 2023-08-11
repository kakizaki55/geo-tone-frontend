import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import projectTemplate from '@utils/project-template.js';
import { globalParams } from '@utils/tone-constants.js';

const currentProject = structuredClone(projectTemplate);
const { volume, fx } = globalParams;

function projectReducer(project, action) {
  switch (action.type) {
    case 'update song volume':
      return { ...project, volume: action.value };
    case 'update song BPM':
      return { ...project, bpm: action.value };
    case 'add new channel':
      return { ...project, channels: [...project.channels, action.value] };
    case 'delete channel':
      return { ...project, channels: action.value };
    case 'update channels':
      return { ...project, channels: action.value };
    case 'update drums':
      return { ...project, drums: action.value };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // ? How might the following states by managed by Sequencer instead? (JL)
  const [addingChannel, setAddingChannel] = useState(false);
  const [channelArray, setChannelArray] = useState([]);

  const [project, dispatch] = useReducer(projectReducer, currentProject);

  useEffect(() => {
    setChannelArray(project.channels);
    setIsLoading(false);
  }, []);

  const handleSongVolume = (e) => {
    dispatch({ type: 'update song volume', value: Number(e.target.value) });
  };

  const handleSongBPM = (e) => {
    dispatch({ type: 'update song BPM', value: Number(e.target.value) });
  };

  const handleAddChannel = (e) => {
    const synthType = e.target.value;

    const newChannel = {
      id: self.crypto.randomUUID(),
      type: synthType,
      osc: 'triangle',
      steps: [null, null, null, null, null, null, null, null],
      volume: volume.default,
      reverb: fx.default,
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

  const handleUpdateDrums = (drums) => {
    dispatch({
      type: 'update drums',
      value: drums,
    });
  };

  const contextValue = {
    project,
    isLoading,
    addingChannel,
    setAddingChannel,
    handleSongVolume,
    handleSongBPM,
    handleAddChannel,
    handleDeleteChannel,
    handleUpdateChannel,
    handleUpdateDrums,
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
