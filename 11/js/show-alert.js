import { isEscapeKey } from './util.js';
import { onUploadFormEscKeydown } from './validation.js';

const onSuccessAlertKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    resetSuccessAlertListeners();
  }
};

const onErrorAlertKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    resetErrorAlertListeners();
  }
};

const onSuccessAlertClick = (event) => {
  if(event.target.className !== 'success__inner') {
    resetSuccessAlertListeners();
  }
};

const onErrorAlertClick = (event) => {
  if(event.target.className !== 'error__inner') {
    resetErrorAlertListeners();
  }
};

function resetSuccessAlertListeners() {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessAlertKeyDown);
  document.removeEventListener('click', onSuccessAlertClick);
}

function resetErrorAlertListeners() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorAlertKeyDown);
  document.addEventListener('keydown', onUploadFormEscKeydown);
  document.removeEventListener('click', onErrorAlertClick);
}

const showSuccessAlert = function(message) {
  const successAlertTemplate = document.querySelector('#success').content;
  const alertFragment = document.createDocumentFragment();
  const alertElement = successAlertTemplate.cloneNode(true);
  alertElement.querySelector('.success__title').textContent = message;
  alertFragment.appendChild(alertElement);
  document.body.append(alertFragment);

  const button = document.querySelector('.success__button');
  const successAlertBlock = document.querySelector('.success');

  button.onclick = () => successAlertBlock.remove();

  document.addEventListener('keydown', onSuccessAlertKeyDown);
  document.addEventListener('click', onSuccessAlertClick);
};

const showErrorAlert = function(message) {
  const errorAlertTemplate = document.querySelector('#error').content;
  const alertFragment = document.createDocumentFragment();
  const alertElement = errorAlertTemplate.cloneNode(true);
  alertElement.querySelector('.error__title').textContent = message;
  alertFragment.appendChild(alertElement);
  document.body.append(alertFragment);

  document.querySelector('.error').style['z-index'] = 2;
  const button = document.querySelector('.error__button');

  button.onclick = () => document.querySelector('.error').remove();

  document.removeEventListener('keydown', onUploadFormEscKeydown);
  document.addEventListener('keydown', onErrorAlertKeyDown);
  document.addEventListener('click', onErrorAlertClick);
};

export { showSuccessAlert, showErrorAlert };
