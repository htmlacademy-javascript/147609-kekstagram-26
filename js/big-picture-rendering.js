const bigPictureDialog = document.querySelector('.big-picture');

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
    image.width = '35';
    image.height = '35';

    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = message;

    commentElement.appendChild(image);
    commentElement.appendChild(textElement);
    commentsElements.append(elementsFragment);
  });

  bigPictureDialog.querySelector('.comments-visible').textContent = comments.length;
};

const openPicture = ({url, likes, comments, description}) => {
  bigPictureDialog.classList.remove('hidden');
  bigPictureDialog.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureDialog.querySelector('.likes-count').textContent = likes;
  bigPictureDialog.querySelector('.comments-count').textContent = comments.length;
  bigPictureDialog.querySelector('.social__caption').textContent = description;
  document.querySelector('body').classList.add('modal-open');
  const loaderButton = bigPictureDialog.querySelector('.social__comments-loader');
  bigPictureDialog.querySelector('.comments-loader').classList.remove('hidden');
  let displayedCommentsCount = 5;
  if(comments.length <= 5) {
    bigPictureDialog.querySelector('.comments-loader').classList.add('hidden');
  }

  loaderButton.addEventListener('click', () => {
    displayedCommentsCount = displayedCommentsCount + 5;
    showComments(comments.slice(0, displayedCommentsCount));
    if(comments.length <= displayedCommentsCount) {
      bigPictureDialog.querySelector('.comments-loader').classList.add('hidden');
    }
  });
  showComments(comments.slice(0, 5));
};

export { openPicture };
