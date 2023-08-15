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

export const highlightCurrentStep = (element, index, styles) => {
  const sequence = document.querySelectorAll(`.${styles[element]}`);

  const getClasses = (element) => {
    return element.className
      .split(' ')
      .map((each) => (each === styles.active ? null : each));
  };

  sequence.forEach((step) => {
    const stepIndexId = Number(step.id.replace(/\D/g, ''));
    const prevClasses = getClasses(step);

    if (index === stepIndexId) {
      step.className = classNames(prevClasses, styles.active);
    } else {
      step.className = classNames(prevClasses);
    }
  });
};
