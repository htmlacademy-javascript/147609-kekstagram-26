import { isEscapeKey } from './utils.js';
import { onUploadFormEscKeydown } from './validation.js';

const onDocumentSuccessKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    resetSuccessAlertListeners();
  }
};

const onDocumentErrorKeyDown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    resetErrorAlertListeners();
  }
};

const onDocumentSuccessClick = (event) => {
  if(event.target.className !== 'success__inner') {
    resetSuccessAlertListeners();
  }
};


const onDocumentErrorClick = (event) => {
  if(event.target.className !== 'error__inner') {
    resetErrorAlertListeners();
  }
};

const onSuccessAlertButtonClick = () => {
  const successAlertBlock = document.querySelector('.success');
  successAlertBlock.remove();
  document.querySelector('.success__button').removeEventListener('click', onSuccessAlertButtonClick);
};


const onErrorAlertButtonClick = () => {
  document.querySelector('.error').remove();
  document.querySelector('.error__button').removeEventListener('click', onErrorAlertButtonClick);
};

const showSuccessAlert = (message) => {
  const successAlertTemplate = document.querySelector('#success').content;
  const alertFragment = document.createDocumentFragment();
  const alertElement = successAlertTemplate.cloneNode(true);
  alertElement.querySelector('.success__title').textContent = message;
  alertFragment.appendChild(alertElement);
  document.body.append(alertFragment);

  const successAlertButton = document.querySelector('.success__button');

  successAlertButton.addEventListener('cllick', onSuccessAlertButtonClick);
  document.addEventListener('keydown', onDocumentSuccessKeyDown);
  document.addEventListener('click', onDocumentSuccessClick);
};

const showErrorAlert = (message, btnText) => {
  const errorAlertTemplate = document.querySelector('#error').content;
  const alertFragment = document.createDocumentFragment();
  const alertElement = errorAlertTemplate.cloneNode(true);
  alertElement.querySelector('.error__title').textContent = message;
  alertFragment.appendChild(alertElement);
  document.body.append(alertFragment);

  document.querySelector('.error').style['z-index'] = 2;
  const button = document.querySelector('.error__button');

  if(btnText) {
    button.textContent = btnText;
  }

  button.addEventListener('click', onErrorAlertButtonClick);
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  document.addEventListener('keydown', onDocumentErrorKeyDown);
  document.addEventListener('click', onDocumentErrorClick);
};

function resetSuccessAlertListeners() {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onDocumentSuccessKeyDown);
  document.removeEventListener('click', onDocumentSuccessClick);
}

function resetErrorAlertListeners() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentErrorKeyDown);
  document.addEventListener('keydown', onUploadFormEscKeydown);
  document.removeEventListener('click', onDocumentErrorClick);
}

export { showSuccessAlert, showErrorAlert };
