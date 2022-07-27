import { saveFilterName, changeSliderConfig, sliderValueElement } from './slider.js';
const STEP_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DECIMAL_NUMBER_SYSREM = 10;

const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const sliderform = document.querySelector('.img-upload__effect-level');

const addScaleStyle = (value) => {
  const transformValue = value / MAX_SCALE_VALUE;
  imgUploadPreview.querySelector('img').style.transform = `scale(${transformValue})`;
};

const resetPhotoStyle = () => {
  scaleControlValue.value = `${MAX_SCALE_VALUE}%`;
  sliderValueElement.value = `${MAX_SCALE_VALUE}%`;
  imgUploadPreview.querySelector('img').className = '';
  imgUploadPreview.querySelector('img').style = '';
  sliderform.classList.add('hidden');
};

const onScaleControlSmallerClick = () => {
  const value = parseInt(scaleControlValue.value, DECIMAL_NUMBER_SYSREM);
  if(value > STEP_VALUE) {
    scaleControlValue.value = `${value - STEP_VALUE}%`;
    addScaleStyle(value - STEP_VALUE);
  }
};

const onScaleControlBiggerClick = () => {
  const value = parseInt(scaleControlValue.value, DECIMAL_NUMBER_SYSREM);
  if(value < MAX_SCALE_VALUE) {
    scaleControlValue.value = `${value + STEP_VALUE}%`;
    addScaleStyle(value + STEP_VALUE);
  }
};

const onFilterChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const filterValue = evt.target.value;

    saveFilterName(filterValue);
    changeSliderConfig();

    if(filterValue !== 'none') {
      imgUploadPreview.querySelector('img').className = `effects__preview--${evt.target.value}`;
      sliderform.classList.remove('hidden');
    } else {
      resetPhotoStyle();
    }
  }
};

resetPhotoStyle();

export { resetPhotoStyle, onScaleControlSmallerClick , onScaleControlBiggerClick, onFilterChange };
