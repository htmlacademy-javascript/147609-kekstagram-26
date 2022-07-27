const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const FILTER_NAMES = {
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat'
};
let filterName = 'none';

const saveFilterName = (filterValue) => {
  filterName = filterValue;
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  switch (filterName) {
    case FILTER_NAMES.chrome:
      imgUploadPreview.querySelector('img').style.filter = `grayscale(${sliderValueElement.value})`;
      break;
    case FILTER_NAMES.sepia:
      imgUploadPreview.querySelector('img').style.filter = `sepia(${sliderValueElement.value})`;
      break;
    case FILTER_NAMES.marvin:
      imgUploadPreview.querySelector('img').style.filter = `invert(${sliderValueElement.value}%)`;
      break;
    case FILTER_NAMES.phobos:
      imgUploadPreview.querySelector('img').style.filter = `blur(${sliderValueElement.value}px)`;
      break;
    case FILTER_NAMES.heat:
      imgUploadPreview.querySelector('img').style.filter = `brightness(${sliderValueElement.value})`;
      break;
    default:
      imgUploadPreview.querySelector('img').style.filter = '';
      break;
  }
});

function changeSliderConfig() {
  switch (filterName) {
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 100,
        step: 0.1,
      });
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 100,
        step: 0.1,
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 100,
        step: 0.1,
      });
      break;
    default:
      sliderElement.noUiSlider.set(100);
      break;
  }
}

export { saveFilterName, changeSliderConfig, sliderValueElement };
