import { getPhotos } from './thumbnail-rendering.js';
import { closeUploadForm } from './validation.js';
import { setImgUploadFormSubmit } from './submit-form.js';
import { filterRandom, filterDiscussed, filterDefault } from './filters.js';

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
  })
  // eslint-disable-next-line no-alert
  .catch(() => alert('Внимание! Произошла ошибка при попытке получения данных!'));

setImgUploadFormSubmit(closeUploadForm);
