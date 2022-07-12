import { openPicture } from './big-picture-rendering.js';

const pictureElementListener = (element, data) => {
	element.addEventListener("click", function(event){
		event.preventDefault();
		openPicture(data);
	}, false);
}

const closeDialog = () => {
	const bigPictureDialog = document.querySelector('.big-picture');
	bigPictureDialog.classList.add('hidden');
	document.querySelector('body').classList.remove('modal-open');	
}

const closeButton = document.querySelector('.big-picture__cancel');

closeButton.addEventListener("click", function(event){
	event.preventDefault();
	closeDialog();
}, false);

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		closeDialog();
	}
});

export { pictureElementListener };