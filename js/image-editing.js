import { saveFilterName, changeSliderConfig, sliderValueElement } from './slider.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadEffectsFieldset = document.querySelector('.img-upload__effects');
const sliderform = document.querySelector('.img-upload__effect-level');

const addScaleStyle = (value) => {
  const transformValue = value / 100;
  imgUploadPreview.querySelector('img').style = `transform: scale(${transformValue})`;
};

const resetPhotoStyle = () => {
  scaleControlValue.value = '100%';
  sliderValueElement.value = '100%';
  imgUploadPreview.querySelector('img').className = '';
  imgUploadPreview.querySelector('img').style = '';
  sliderform.classList.add('hidden');
};

const onControlSmallerClick = () => {
  const value = parseInt(scaleControlValue.value, 10);
  if(value > 0) {
    scaleControlValue.value = `${value - 25}%`;
    addScaleStyle(value - 25);
  }
};

const onControlBiggerClick = () => {
  const value = parseInt(scaleControlValue.value, 10);
  if(value < 100) {
    scaleControlValue.value = `${value + 25}%`;
    addScaleStyle(value + 25);
  }
};

function onFilterChange (evt) {
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
}

scaleControlSmaller.addEventListener('click', onControlSmallerClick);
scaleControlBigger.addEventListener('click', onControlBiggerClick);

imgUploadEffectsFieldset.addEventListener('change', onFilterChange);

resetPhotoStyle();

export { resetPhotoStyle };
