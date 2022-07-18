import { isEscapeKey } from './util.js';
import { resetPhotoStyle } from './image-editing.js';

const form = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('#upload-file');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const hashtagRegExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const uploadOverlay = document.querySelector('.img-upload__overlay');

const onUploadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  form.reset();
  pristine.reset();
  resetPhotoStyle();
}

function validateHashtag(value) {
  const hashtags = value.trim().split(' ');
  let validate = true;
  if(!value.length) {
    return true;
  }
  if(hashtags.length > 5) {
    return false;
  }
  hashtags.forEach((elem, i) => {
    if(hashtags.filter((item) => item.toLowerCase() === elem.toLowerCase()).length > 1) {
      validate = false;
    }
    if(!hashtagRegExp.test(hashtags[i])) {
      validate = false;
    }
  });

  return validate;
}

pristine.addValidator(
  hashtagsField,
  validateHashtag,
  'Некорректный #ХэшТег'
);

hashtagsField.addEventListener('input', () => {
  pristine.validate();
});

uploadFileElement.addEventListener('change', (evt) => {
  if(evt) {
    uploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onUploadFormEscKeydown);
    const cancelButton = document.querySelector('.img-upload__cancel');
    cancelButton.addEventListener('click', (event)=> {
      event.preventDefault();
      closeUploadForm();
    }, false);
  }
});

hashtagsField.addEventListener('focus', () => document.removeEventListener('keydown', onUploadFormEscKeydown));

hashtagsField.addEventListener('blur', () => document.addEventListener('keydown', onUploadFormEscKeydown));

commentField.addEventListener('focus', () => document.removeEventListener('keydown', onUploadFormEscKeydown));

commentField.addEventListener('blur', () => document.addEventListener('keydown', onUploadFormEscKeydown));

export { closeUploadForm, onUploadFormEscKeydown, pristine };
