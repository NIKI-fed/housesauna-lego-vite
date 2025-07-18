const sliderElement = document.querySelector(`.content-slider`);

let sliderWrapper = sliderElement.querySelector(`.content-slider__wrapper`);
let sliderItems = sliderElement.querySelectorAll(`.content-slider__item`);
let sliderControls = sliderElement.querySelectorAll(`.content-slider__control`);
let sliderControlLeft = sliderElement.querySelector(`.content-slider__control-left`);
let sliderControlRight = sliderElement.querySelector(`.content-slider__control-right`);
let sliderBullets = sliderElement.querySelectorAll(`.content-slider__bullet`);
let wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
let itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
let html = sliderElement.innerHTML;
let items = [];

let sliderInterval = ``;
let positionLeftItem = 0;
let transform = 0;
let step = itemWidth / wrapperWidth * 100;

const states = [
  { active: false, minWidth: 0, count: 1 },
  { active: false, minWidth: 980, count: 2 }
];

const mainConfig = {
  isCycling: true,
  direction: `right`,
  interval: 5000,
  pause: true
};

sliderItems.forEach((item, index) => {
  items.push({
    item: item,
    position: index,
    transform: 0
  });
});

const setActive = () => {
  let activeIndex = 0;
  const width = parseFloat(document.body.clientWidth);
  states.forEach((item, index, arr) => {
    states[index].active = false;
    if (width >= states[index].minWidth)
      activeIndex = index;
  });
  states[activeIndex].active = true;
};

const getActive = () => {
  let activeIndex;
  states.forEach((item, index, arr) => {
    if (states[index].active) {
      activeIndex = index;
    }
  });
  return activeIndex;
};

const position = {
  getItemMin: () => {
    let indexItem = 0;
    items.forEach((item, index) => {
      if (item.position < items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getItemMax: () => {
    let indexItem = 0;
    items.forEach((item, index) => {
      if (item.position > items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getMin: () => {
    return items[position.getItemMin()].position;
  },
  getMax: () => {
    return items[position.getItemMax()].position;
  }
};

const transformItem = (direction) => {
  let nextItem;
  
  if (direction === `right`) {
    positionLeftItem++;
    if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
      nextItem = position.getItemMin();
      items[nextItem].position = position.getMax() + 1;
      items[nextItem].transform += items.length * 100;
      items[nextItem].item.style.transform = `translateX(` + items[nextItem].transform + `%)`;
    }
    transform -= step;
  }
  if (direction === `left`) {
    positionLeftItem--;
    if (positionLeftItem < position.getMin()) {
      nextItem = position.getItemMax();
      items[nextItem].position = position.getMin() - 1;
      items[nextItem].transform -= items.length * 100;
      items[nextItem].item.style.transform = `translateX(` + items[nextItem].transform + `%)`;
    }
    transform += step;
  }
  sliderWrapper.style.transform = `translateX(` + transform + `%)`;
};

const cycle = (direction) => {
  if (!mainConfig.isCycling) {
    return;
  }
  sliderInterval = setInterval(() => {
    transformItem(direction);
  }, mainConfig.interval);
};

const controlClick = (e) => {
  if (e.target.classList.contains(`content-slider__control`)) {
    e.preventDefault();
    const clickDirection = e.target.classList.contains(`content-slider__control-right`) ? `right` : `left`;
    transformItem(clickDirection);
    clearInterval(sliderInterval);
    cycle(mainConfig.direction);
  }
};

const handleVisibilityChange = () => {
  if (document.visibilityState === `hidden`) {
    clearInterval(sliderInterval);
  } else {
    clearInterval(sliderInterval);
    cycle(mainConfig.direction);
  }
};

const refresh = () => {
  clearInterval(sliderInterval);
  sliderElement.innerHTML = html;
  sliderWrapper = sliderElement.querySelector(`.content-slider__wrapper`);
  sliderItems = sliderElement.querySelectorAll(`.content-slider__item`);
  sliderControls = sliderElement.querySelectorAll(`.content-slider__control`);
  sliderControlLeft = sliderElement.querySelector(`.content-slider__control-left`);
  sliderControlRight = sliderElement.querySelector(`.content-slider__control-right`);
  sliderBullets = sliderElement.querySelectorAll(`.content-slider__bullet`);
  wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
  itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
  positionLeftItem = 0;
  transform = 0;
  step = itemWidth / wrapperWidth * 100;
  items = [];
  sliderItems.forEach((item, index) => {
    items.push({
      item: item,
      position: index,
      transform: 0
    });
  });
};

const setUpListeners = () => {
  sliderElement.addEventListener(`click`, controlClick);
  if (mainConfig.pause && mainConfig.isCycling) {
    sliderElement.addEventListener(`mouseenter`, () => {
      clearInterval(sliderInterval);
    });
    sliderElement.addEventListener(`mouseleave`, () => {
      clearInterval(sliderInterval);
      cycle(mainConfig.direction);
    });
  }
  document.addEventListener(`visibilitychange`, handleVisibilityChange, false);
  window.addEventListener(`resize`, () => {
    let activeIndex = 0;
    const width = parseFloat(document.body.clientWidth);
    states.forEach((item, index, arr) => {
      if (width >= states[index].minWidth)
        activeIndex = index;
    });
    if (activeIndex !== getActive()) {
      setActive();
      refresh();
    }
  });
};

setUpListeners();
if (document.visibilityState === `visible`) {
  cycle(mainConfig.direction);
}
setActive();
