import { isEscapeKey } from './utils.js';

const AVATAR_SIZE = '35';
const COMMENTS_COUNT_VALUE = 5;

const bigPictureDialog = document.querySelector('.big-picture');
const loaderButton = bigPictureDialog.querySelector('.social__comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');

let displayedCommentsCount = COMMENTS_COUNT_VALUE;
let commentsData;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeDialog();
  }
};

const bigPictureElementListener = (element, data) => {
  element.addEventListener('click', (event)=> {
    event.preventDefault();
    openPicture(data);
  }, false);
};

const showComments = (comments) => {
  const commentsElements = document.querySelector('.social__comments');
  commentsElements.innerHTML = '';
  const elementsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    elementsFragment.appendChild(commentElement);
    const image = document.createElement('img');
    image.classList.add('social__picture');
    image.src = avatar;
    image.alt = name;
    image.width = AVATAR_SIZE;
    image.height = AVATAR_SIZE;

    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = message;

    commentElement.appendChild(image);
    commentElement.appendChild(textElement);
    commentsElements.append(elementsFragment);
  });

  bigPictureDialog.querySelector('.comments-visible').textContent = comments.length;
};

const onCloseButtonClick = (event) => {
  event.preventDefault();
  closeDialog();
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const onLoaderButtonClick = (event) => {
  event.preventDefault();
  displayedCommentsCount = displayedCommentsCount + COMMENTS_COUNT_VALUE;
  showComments(commentsData.slice(0, displayedCommentsCount));
  if(displayedCommentsCount >= commentsData.length) {
    bigPictureDialog.querySelector('.comments-loader').classList.add('hidden');
    loaderButton.removeEventListener('click', onLoaderButtonClick);
    displayedCommentsCount = COMMENTS_COUNT_VALUE;
  }
};

function openPicture({url, likes, comments, description}) {
  bigPictureDialog.classList.remove('hidden');
  bigPictureDialog.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureDialog.querySelector('.likes-count').textContent = likes;
  bigPictureDialog.querySelector('.comments-count').textContent = comments.length;
  bigPictureDialog.querySelector('.social__caption').textContent = description;
  document.querySelector('body').classList.add('modal-open');
  bigPictureDialog.querySelector('.comments-loader').classList.remove('hidden');
  if(comments.length <= COMMENTS_COUNT_VALUE) {
    bigPictureDialog.querySelector('.comments-loader').classList.add('hidden');
  }
  commentsData = comments;

  loaderButton.addEventListener('click', onLoaderButtonClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  showComments(comments.slice(0, COMMENTS_COUNT_VALUE));
}

function closeDialog() {
  bigPictureDialog.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { bigPictureElementListener };
