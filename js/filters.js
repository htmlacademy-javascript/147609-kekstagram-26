import { getRandomNumber, debounce } from './util.js';
import { getPhotos } from './thumbnail-rendering.js';

const RERENDER_DELAY = 500;

const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');
const filterDefaultBtn = document.querySelector('#filter-default');
const buttons = document.querySelectorAll('.img-filters__button');
const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

function toggleClass(buttonElement) {
  buttons.forEach((item) => item.classList.remove('img-filters__button--active'));
  buttonElement.classList.add('img-filters__button--active');
}

function filterDefault(photosList) {
  filterDefaultBtn.addEventListener('click', () => {
    toggleClass(filterDefaultBtn);
    debounce(getPhotos(photosList), RERENDER_DELAY);
  });
}

function filterRandom(photosList) {
  filterRandomBtn.addEventListener('click', () => {
    toggleClass(filterRandomBtn);
    const newList = [];
    const ids = [];

    for(let i = 0; newList.length < 10; i++) {
      const id = getRandomNumber(0, photosList.length - 1);
      if(!ids.includes(id)) {
        ids.push(id);
        newList.push(photosList[id]);
      }
      debounce(getPhotos(newList), RERENDER_DELAY);
    }
  });
}

function filterDiscussed(photosList) {
  filterDiscussedBtn.addEventListener('click', () => {
    toggleClass(filterDiscussedBtn);
    debounce(getPhotos(photosList.slice().sort(comparePhotos)), RERENDER_DELAY);
  });
}

export { filterDefault, filterRandom, filterDiscussed };
