const names = ['Павел', 'Иван', 'Олег', 'Наталья', 'Мария', 'Татьяна'];

const getRandomNumber = (min, max) => {
  if(min >= 0 && max >= 0) {
    const maxValue = max > min ? max : min;
    const minValue = max > min ? min : max;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  return null;
};

const checkMaxLength = (string, maxLength) => string.length <= maxLength;

const generateComments = (amount) => {
  const comments = [];
  const messages = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`.split('\n');
  for(let i = 1; i <= amount; i++) {
    const object = {
      id: i,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: messages[getRandomNumber(0, messages.length - 1)],
      name: names[getRandomNumber(0, names.length - 1)],
    };
    comments.push(object);
  }
  return comments;
};

const generatePhotos = () => {
  const photos = [];

  for(let i = 1; i <= 25; i++) {
    const object = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии №${i}`,
      likes: getRandomNumber(14 + i, 200),
      comments: generateComments(getRandomNumber(1, 10))
    };
    photos.push(object);
  }

  return photos;
};

