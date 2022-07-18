import { getPhotos } from './thumbnail-rendering.js';
import { closeUploadForm } from './validation.js';
import { setImgUploadFormSubmit } from './submit-form.js';
import { filterRandom, filterDiscussed, filterDefault } from './filters.js';
import { showErrorAlert } from './show-result-messages.js';

fetch('https://26.javascript.pages.academy/kekstagram/data')
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
  }).catch(() => showErrorAlert('Возникла ошибка при загрузке данных.', 'Ок'));

setImgUploadFormSubmit(closeUploadForm);
