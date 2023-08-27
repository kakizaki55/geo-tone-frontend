import classNames from 'classnames';

// ? ...should these be replaced with custom hooks? (JL)
export const cycleStepValue = (e, notes, setNotes, keyArray) => {
  const noteIndex = e.target.id.split('-')[1];
  const keyArrayIndex = keyArray.findIndex(
    (note) => note === e.target.textContent
  );

  const updatedNotes = notes.map((note, index) => {
    if (Number(noteIndex) === index)
      if (note === null) {
        // toggle ON for single-note keys (e.g. samples)
        return keyArray[0];
      } else if (keyArray.length > 1) {
        // increment keys of more than one note
        return keyArray[keyArrayIndex + 1];
      } else if (keyArray.length === 1) {
        // toggle OFF single-note keys
        return null;
      }
    return note;
  });

  setNotes(updatedNotes);
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
