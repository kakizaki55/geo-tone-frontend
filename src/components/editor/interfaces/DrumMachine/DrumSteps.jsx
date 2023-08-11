import React from 'react';
import styles from './DrumMachine.css';
import Pad from './Pad';
import DrumDial from './DrumDial';

const DrumSteps = (props) => {
  const { drumProps } = props;

  return (
    <>
      {drumProps.map((drum) => {
        return (
          <div key={drum.type} className={styles.drumStepsContainer}>
            <div>
              {drum.steps.map((midi, index) => {
                return (
                  <Pad
                    key={`step-${index}`}
                    note={midi}
                    index={index}
                    handleDrumChange={drum.handleDrumChange}
                    drums={drum.steps}
                    setDrums={drum.setSteps}
                  />
                );
              })}
            </div>
            <div className={styles.volume}>
              Volume
              <DrumDial
                value={drum.volume}
                setValue={drum.setVolume}
              ></DrumDial>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DrumSteps;
