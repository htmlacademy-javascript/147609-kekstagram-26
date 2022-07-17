import { openPicture } from './big-picture-rendering.js';
import { isEscapeKey } from './util.js';

const closeButton = document.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeDialog();
  }
};

function closeDialog() {
  const bigPictureDialog = document.querySelector('.big-picture');
  bigPictureDialog.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const pictureElementListener = (element, data) => {
  element.addEventListener('click', (event)=> {
    event.preventDefault();
    openPicture(data);
    document.addEventListener('keydown', onPopupEscKeydown);
  }, false);
};

closeButton.addEventListener('click', (event)=> {
  event.preventDefault();
  closeDialog();
}, false);

export { pictureElementListener, onPopupEscKeydown };
