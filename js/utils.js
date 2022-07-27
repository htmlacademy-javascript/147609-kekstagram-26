const getRandomNumber = (min, max) => {
  if(min >= 0 && max >= 0) {
    const maxValue = max > min ? max : min;
    const minValue = max > min ? min : max;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  return null;
};

const checkMaxLength = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export { checkMaxLength, getRandomNumber, isEscapeKey, debounce, shuffleArray };
