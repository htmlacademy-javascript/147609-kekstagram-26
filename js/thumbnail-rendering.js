import { generatePhotos } from './data.js';

const picturesListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;
const generatedPhotos = generatePhotos();
const picturesListFragment = document.createDocumentFragment();

generatedPhotos.forEach(({url, likes, comments}) => {
	const pictureElement = pictureTemplate.cloneNode(true);
	pictureElement.querySelector('.picture__img').src = url;
	pictureElement.querySelector('.picture__likes').textContent = likes;
	pictureElement.querySelector('.picture__comments').textContent = comments.length;
	picturesListFragment.appendChild(pictureElement);
});
  
picturesListElement.appendChild(picturesListFragment);