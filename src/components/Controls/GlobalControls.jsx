import React from 'react';
import { useProject } from '../../context/ProjectContext';

export default function GlobalControls({ start, setStart }) {
  const {
    project: { project },
    handleProjectVolume,
    handleSongBPM,
  } = useProject();

  return (
    <div id="global-controls">
      <button onClick={() => setStart(!start)}>
        {start ? 'stop' : 'play'}
      </button>
      <label>
        Project Volume
        <input
          type="range"
          min="-40"
          max="0"
          value={project.volume}
          onChange={(e) => handleProjectVolume(e)}
        />
      </label>

      <label>
        BPM
        <input
          type="number"
          min="0"
          max="440"
          step="10"
          value={project.bpm}
          onChange={handleSongBPM}
        />
      </label>
    </div>
  );
}
