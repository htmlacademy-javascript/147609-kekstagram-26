import { showErrorAlert } from './show-result-messages.js';
import { pristine } from './validation.js';
import { sendForm } from './api.js';

const submitButton = document.querySelector('.img-upload__submit');

const setImgUploadFormSubmit = (onSuccess) => {
  document.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      submitButton.setAttribute('disabled', 'disabled');
      const formData = new FormData(evt.target);
      sendForm(formData, onSuccess, submitButton);
    } else {
      showErrorAlert('Некорректное заполнение формы', 'Ок');
    }
  });
};

export { setImgUploadFormSubmit };

