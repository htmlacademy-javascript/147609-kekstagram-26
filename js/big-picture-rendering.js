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
}

const openPicture = ({url, likes, comments, description}) => {
	const bigPictureDialog = document.querySelector('.big-picture');
	bigPictureDialog.classList.remove('hidden');
	bigPictureDialog.querySelector('.big-picture__img').querySelector('img').src = url;
	bigPictureDialog.querySelector('.likes-count').textContent = likes;
	bigPictureDialog.querySelector('.comments-count').textContent = comments.length;
	bigPictureDialog.querySelector('.social__caption').textContent = description;
	showComments(comments);

	bigPictureDialog.querySelector('.social__comment-count').classList.add('hidden');
	bigPictureDialog.querySelector('.comments-loader').classList.add('hidden');
	document.querySelector('body').classList.add('modal-open');
}

export { openPicture };
