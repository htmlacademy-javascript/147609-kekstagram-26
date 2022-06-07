const getRandomNumber = (min, max) => {
  if(min >= 0 && max >= 0) {
    const maxValue = max > min ? max : min;
    const minValue = max > min ? min : max;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  return null;
};

const checkMaxLength = (string, maxLength) => string.length <= maxLength;
