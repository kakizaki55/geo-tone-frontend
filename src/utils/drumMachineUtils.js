  import classNames from 'classnames';

  export const handleDrumChange = (e, drums, setDrums ) => {
    const indexOfStep = e.target.id.split('-')[1];
    const newDrumsArray = drums.map((hit, index) => {
      if(Number(indexOfStep) === index && hit === 'C3') {
        return null
      }
      if(Number(indexOfStep) === index && hit === null) {
        return 'C3'
      }
      return hit
    })
    setDrums(newDrumsArray)
  }

  export const highlightCurrentStep = (stepIndex, styles) => {
      const drums = document.querySelectorAll(`.${styles.drumPadOn}`);
      drums.forEach((stepDiv) => {
        const stepIndexId = Number(stepDiv.id.replace(/\D/g, ""))
      if (stepIndex === stepIndexId) {
        stepDiv.className = classNames(
          styles.drumPadOn,
          styles.active,
        );
      } else {
          stepDiv.className = classNames(
          styles.drumPadOn,
        );
      }
    });
  };