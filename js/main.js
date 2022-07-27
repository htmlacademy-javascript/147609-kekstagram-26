import './utils.js';
import './image-editing.js';
import './slider.js';
import './big-picture.js';
import './thumbnail-rendering.js';
import './show-result-messages.js';
import { closeUploadForm } from './validation.js';
import { setImgUploadFormSubmit } from './submit-form.js';
import { getData } from './api.js';
import './filters.js';
import './uploaded-picture.js';

getData();
setImgUploadFormSubmit(closeUploadForm);
