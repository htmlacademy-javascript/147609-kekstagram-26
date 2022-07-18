import { openPicture } from './big-picture-rendering.js';
import { isEscapeKey } from './util.js';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeDialog();
  }
};

const pictureElementListener = (element, data) => {
  element.addEventListener('click', (event)=> {
    event.preventDefault();
    openPicture(data);
    document.addEventListener('keydown', onPopupEscKeydown);
  }, false);
};

function closeDialog() {
  const bigPictureDialog = document.querySelector('.big-picture');
  bigPictureDialog.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

export { pictureElementListener, onPopupEscKeydown, closeDialog };
