import classNames from 'classnames';

export const handleDrumChange = (e, drums, setDrums) => {
  const indexOfStep = e.target.id.split('-')[1];
  const newDrumsArray = drums.map((hit, index) => {
    if (Number(indexOfStep) === index && hit === 'C3') {
      return null;
    }
    if (Number(indexOfStep) === index && hit === null) {
      return 'C3';
    }
    return hit;
  });
  setDrums(newDrumsArray);
};

export const highlightCurrentDrumStep = (stepIndex, styles) => {
  const drums = document.querySelectorAll(`.${styles.drumPadOn}`);
  drums.forEach((stepDiv) => {
    const stepIndexId = Number(stepDiv.id.replace(/\D/g, ''));
    if (stepIndex === stepIndexId) {
      stepDiv.className = classNames(styles.drumPadOn, styles.active);
    } else {
      stepDiv.className = classNames(styles.drumPadOn);
    }
  });
};

export const highlightCurrentSequenceStep = (channelId, stepIndex, styles) => {
  const sequence = document
    .getElementById(`channel-${channelId}`)
    .querySelectorAll(`.${styles.step}`);

  const getClasses = (element) => {
    return element.className.split(' ').map((each) => each);
  };

  sequence.forEach((stepDiv, stepDivIndex) => {
    const prevClasses = getClasses(stepDiv);
    const classIsStep = prevClasses[0];
    const classPitchValue = prevClasses[1] ? prevClasses[1] : null;

    let active = {
      [`${classIsStep}`]: true,
      [`${classPitchValue}`]: true,
      [`${styles.active}`]: true,
    };

    let inactive = {
      [`${classIsStep}`]: true,
      [`${classPitchValue}`]: true,
      [`${styles.active}`]: false,
    };

    if (stepIndex === stepDivIndex) {
      stepDiv.className = classNames(active);
    } else {
      stepDiv.className = classNames(inactive);
    }
  });
};
