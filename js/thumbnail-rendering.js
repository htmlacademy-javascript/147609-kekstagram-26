import { pictureElementListener } from './actions-with-photo.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const imgFilters = document.querySelector('.img-filters');

const getPhotos = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  const picturesListFragment = document.createDocumentFragment();
  const pictures = document.querySelectorAll('.picture');
  if(pictures.length > 0) {
    pictures.forEach((item) => item.remove());
  }
  photos.forEach((data) => {
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
};

export { getPhotos };
