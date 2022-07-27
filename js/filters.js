import { shuffleArray, debounce } from './utils.js';
import { getPhotos } from './thumbnail-rendering.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_AMOUNT = 10;

const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');
const filterDefaultBtn = document.querySelector('#filter-default');
const buttons = document.querySelectorAll('.img-filters__button');
const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const toggleClass = (buttonElement) => {
  buttons.forEach((item) => item.classList.remove('img-filters__button--active'));
  buttonElement.classList.add('img-filters__button--active');
};

const filterDefault = (photosList) => {
  filterDefaultBtn.addEventListener('click', () => {
    toggleClass(filterDefaultBtn);
    debounce(getPhotos(photosList), RERENDER_DELAY);
  });
};

const filterRandom = (photosList) => {
  filterRandomBtn.addEventListener('click', () => {
    toggleClass(filterRandomBtn);
    debounce(getPhotos(shuffleArray(photosList).slice(0, RANDOM_PHOTOS_AMOUNT)), RERENDER_DELAY);
  });
};

const filterDiscussed = (photosList) => {
  filterDiscussedBtn.addEventListener('click', () => {
    toggleClass(filterDiscussedBtn);
    debounce(getPhotos(photosList.slice().sort(comparePhotos)), RERENDER_DELAY);
  });
};

export { filterDefault, filterRandom, filterDiscussed };
