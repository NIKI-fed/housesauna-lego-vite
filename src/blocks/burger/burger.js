const header = document.querySelector(`.pageHeader`);
const burger = header.querySelector(`.burger`);
const burgerElement = header.querySelector(`.burger__element`);
const nav = header.querySelector(`.mainNav`);

const toggleNav = () => {
  burgerElement.classList.toggle(`burger__element--close`);
  nav.classList.toggle(`mainNav--open`);
};

burger.addEventListener(`click`, toggleNav);