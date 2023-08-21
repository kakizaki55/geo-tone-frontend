import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useRef,
} from 'react';
import projectTemplate from '@utils/project-template.js';

const currentProject = structuredClone(projectTemplate);

function projectReducer(project, action) {
  switch (action.type) {
    case 'update song volume':
      return { ...project, volume: action.value };
    case 'update song BPM':
      return { ...project, bpm: action.value };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, dispatch] = useReducer(projectReducer, currentProject);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSongVolume = (e) => {
    dispatch({ type: 'update song volume', value: Number(e.target.value) });
  };

  const handleSongBPM = (e) => {
    dispatch({ type: 'update song BPM', value: Number(e.target.value) });
  };

  const contextValue = {
    project,
    isLoading,
    handleSongVolume,
    handleSongBPM,
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
