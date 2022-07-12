import { generatePhotos } from './data.js';
import { pictureElementListener } from './actions-with-photo.js';

const picturesListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;
const generatedPhotos = generatePhotos();
const picturesListFragment = document.createDocumentFragment();

generatedPhotos.forEach((data) => {
  const {url, likes, comments} = data;
  const pictureElement = pictureTemplate.cloneNode(true);
  const picture = pictureElement.querySelector('.picture');
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(pictureElement);
  pictureElementListener(picture, data);
});

picturesListElement.appendChild(picturesListFragment);
