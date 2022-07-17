import { showSuccessAlert, showErrorAlert } from './show-alert.js';
import { pristine } from './validation.js';

const submitButton = document.querySelector('.img-upload__submit');

const setImgUploadFormSubmit = (onSuccess) => {
  document.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      submitButton.setAttribute('disabled', 'disabled');
      const formData = new FormData(evt.target);

      fetch(
        'https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then(() => onSuccess(showSuccessAlert('Картинка сохранена.'))
      ).catch(() => showErrorAlert('Возникла ошибка при попытке отправить форму.')
      ).finally(() => submitButton.removeAttribute('disabled'));
    } else {
      // eslint-disable-next-line no-console
      console.log('Форма невалидна');
    }
  });
};

export { setImgUploadFormSubmit };

