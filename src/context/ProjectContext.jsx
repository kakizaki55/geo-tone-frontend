import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { findProjectById } from '../services/project';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
} from '../utils/toneUtils';

const initialState = {
  userId: 1, // TODO: replace with userId from UserContext
  title: 'untitled',
  bpm: 120,
  volume: -12,
  channels: [
    {
      id: 0,
      type: 'synth',
      osc: 'sine',
      steps: [null, null, null, null, null, null, null, null],
      volume: -5,
      reverb: 0.5,
    },
  ],
};

function projectReducer(project, action) {
  switch (action.type) {
    case 'update project volume':
      return { ...project, volume: Number(action.value) };
    case 'update song BPM':
      return { ...project, bpm: Number(action.value) };
    case 'add new channel':
      return { ...project, channels: [...project.channels, action.value] };
    case 'delete channel':
      return { ...project, channels: action.value };
    case 'update channels':
      return { ...project, channels: action.value };
    case 'update project title':
      return { ...project, title: action.value };
    case 'load project':
      return {
        ...project,
        ...action.value.data,
        channels: [...action.value.channels],
      };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const { id } = useParams();

  const projectId = id;
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('untitled'); //TODO: add editing functionality
  const [addingChannel, setAddingChannel] = useState(false);
  const [channelArray, setChannelArray] = useState([]);

  const [project, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, channels } = await findProjectById(projectId);
      dispatch({
        type: 'load project',
        value: { data, channels },
      });
      setChannelArray(channels);
      setIsLoading(false);
    };
    fetchProject();
  }, [projectId]);

  const handleProjectVolume = (e) => {
    dispatch({ type: 'update project volume', value: e.target.value });
  };

  const handleSongBPM = (e) => {
    dispatch({ type: 'update song BPM', value: e.target.value });
  };

  const handleTitleChange = (e) => {
    dispatch({ type: 'update project title', value: e.target.value });
  };

  // adds a new channel
  const handleAddChannel = (e) => {
    const newChannel = {
      id: project.channels.length, //TODO: handle id production differently
      type: e.target.value,
      osc: 'sine',
      steps: [null, null, null, null, null, null, null, null],
      volume: -5,
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

  // updates channel array
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
    projectId,
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleProjectVolume,
    handleSongBPM,
    handleAddChannel,
    handleDeleteChannel,
    handleUpdateChannel,
    handleTitleChange,
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
