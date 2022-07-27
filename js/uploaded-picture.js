import { onScaleControlSmallerClick, onScaleControlBiggerClick, onFilterChange } from './image-editing.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadEffectsFieldset = document.querySelector('.img-upload__effects');
const fileChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((el) => fileName.endsWith(el));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    imgUploadEffectsFieldset.addEventListener('change', onFilterChange);
  }
});

export { scaleControlSmaller, scaleControlBigger, imgUploadEffectsFieldset };
