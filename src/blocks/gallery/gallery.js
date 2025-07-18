const gallery = document.querySelector(`.gallery`);
const images = gallery.querySelectorAll(`.gallery__img`);

const overlay = document.querySelector(`.overlay`);
overlay.appendChild(gallery.cloneNode(true));

const overlayGallery = overlay.querySelector(`.gallery`);
overlayGallery.classList.add(`gallery--flex`);

const overlayGalleryImages = overlayGallery.querySelectorAll(`.gallery__img`);
overlayGalleryImages.forEach((img) => {
  img.classList.add(`gallery__img--view`);
});

const openImg = (img, index) => {
  overlay.classList.toggle(`overlay--visible`);
  overlayGalleryImages[index].scrollIntoView();
  overlay.addEventListener(`click`, closeImg);
};

const closeImg = () => {
  overlay.classList.remove(`overlay--visible`);
  overlay.removeEventListener(`click`, closeImg);
};

images.forEach((img) => {
  img.addEventListener(`click`, (evt) => {
    openImg(evt.target, parseInt(evt.target.dataset.imgIndex));
  });
});