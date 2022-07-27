import { getPhotos } from './thumbnail-rendering.js';
import { filterRandom, filterDiscussed, filterDefault } from './filters.js';
import { showSuccessAlert, showErrorAlert } from './show-result-messages.js';

const SUCCESS_MESSAGE = 'Картинка сохранена.';
const GET_DATA_ERROR_MESSAGE = 'Возникла ошибка при загрузке данных.';
const SEND_FORM_ERROR_MESSAGE = 'Возникла ошибка при попытке отправить форму.';
const BUTTON_TEXT_ALERT = 'Ок';
const URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = () => {
  fetch(`${URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((photos) => {
      getPhotos(photos);
      filterDefault(photos);
      filterRandom(photos);
      filterDiscussed(photos);
    }).catch(() => showErrorAlert(GET_DATA_ERROR_MESSAGE, BUTTON_TEXT_ALERT));
};

const sendForm = (data, onSuccess, submitButtonElement) => {
  fetch(
    URL,
    {
      method: 'POST',
      body: data,
    },
  ).then(() => onSuccess(showSuccessAlert(SUCCESS_MESSAGE))
  ).catch(() => showErrorAlert(SEND_FORM_ERROR_MESSAGE)
  ).finally(() => submitButtonElement.removeAttribute('disabled'));
};

export { sendForm, getData };
