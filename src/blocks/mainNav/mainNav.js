const itemSub = document.querySelector(`.mainNav__item--sub`);
const menuSub = itemSub.querySelector(`.mainNav__listSub`);

// Функция для открытия/закрытия подменю
const toggleMenuSub = () => {
  if (!menuSub.classList.contains(`mainNav__listSub--visible`)) {
    menuSub.classList.add(`mainNav__listSub--visible`);
  } else {
    menuSub.classList.remove(`mainNav__listSub--visible`);
  }
}

// Обработчик кликов внутри подменю
const handleSubItemClick = (evt) => {
  evt.preventDefault();
  evt.stopImmediatePropagation();

  if (evt.target.classList.contains(`mainNav__link`) && !evt.target.classList.contains(`mainNav__link--sub`)) {
        toggleMenuSub()
        document.addEventListener(`click`, subItemOnClick);
      } else if (!evt.target.classList.contains(`mainNav__link--sub`)) {
        toggleMenuSub()
      } else {
        window.location = evt.target.href
      }
};

// Функция закрытия подменю по клику вне поля
const withoutClick = (evt) => {
  if (menuSub.classList.contains(`mainNav__listSub--visible`) && !itemSub.contains(evt.target)) {
    toggleMenuSub();
    document.removeEventListener('click', handleSubItemClick);
  }
}

document.addEventListener('click', withoutClick);
itemSub.addEventListener('click', handleSubItemClick);