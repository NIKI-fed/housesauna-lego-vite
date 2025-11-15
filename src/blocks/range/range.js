// код для связи с бэком

const inputMin = document.getElementById("input__min--square");
const inputMax = document.getElementById("input__max--square");
const rangeMin = document.getElementById("track__min--point");
const rangeMax = document.getElementById("track__max--point");
const trackContainer = document.querySelector(".track__container");

const minValue = parseFloat(rangeMin.min);
const maxValue = parseFloat(rangeMax.max);

const listContainer = document.getElementById("listContainer");

const gap = 1;

function updateTrack() {
  const minPercent = ((rangeMin.value - minValue) / (maxValue - minValue)) * 100;
  const maxPercent = ((rangeMax.value - minValue) / (maxValue - minValue)) * 100;

  trackContainer.style.setProperty("--min-percent", `${minPercent}%`);
  trackContainer.style.setProperty("--max-percent", `${maxPercent}%`);
}

function syncFromRanges() {
  if (parseFloat(rangeMax.value) - parseFloat(rangeMin.value) < gap) {
    if (this === rangeMin) {
      rangeMin.value = parseFloat(rangeMax.value) - gap;
    } else {
      rangeMax.value = parseFloat(rangeMin.value) + gap;
    }
  }

  inputMin.value = rangeMin.value;
  inputMax.value = rangeMax.value;
  updateTrack();
  sendFilterRequest();
}

function syncFromInputs() {
  let minV = parseFloat(inputMin.value) || minValue;
  let maxV = parseFloat(inputMax.value) || maxValue;

  if (minV < minValue) minV = minValue;
  if (maxV > maxValue) maxV = maxValue;

  if (maxV - minV < gap) {
    if (this === inputMin) {
      minV = maxV - gap;
    } else {
      maxV = minV + gap;
    }
  }

  inputMin.value = minV;
  inputMax.value = maxV;

  rangeMin.value = minV;
  rangeMax.value = maxV;

  updateTrack();
  sendFilterRequest();
}

function sendFilterRequest() {
  let path = window.location.pathname;
  let url;

  if (path.includes("houses-categories") || path.includes("saunas-categories")) {
    if (!path.endsWith("/")) path += "/";
    url = `${path}filter/?min_square=${rangeMin.value}&max_square=${rangeMax.value}`;
  }
  else if (path.includes("/houses/")) {
    url = `/houses/filter/?min_square=${rangeMin.value}&max_square=${rangeMax.value}`;
  }
  else if (path.includes("/saunas/")) {
    url = `/saunas/filter/?min_square=${rangeMin.value}&max_square=${rangeMax.value}`;
  }

  fetch(url)
    .then(res => res.text())
    .then(html => listContainer.innerHTML = html);
}

rangeMin.addEventListener("input", syncFromRanges);
rangeMax.addEventListener("input", syncFromRanges);
inputMin.addEventListener("change", syncFromInputs);
inputMax.addEventListener("change", syncFromInputs);

updateTrack();

// код для фронта
// const minInput = document.getElementById('input__min--square');
// const maxInput = document.getElementById('input__max--square');
// const minTrack = document.getElementById('track__min--point');
// const maxTrack = document.getElementById('track__max--point');
// const track = document.querySelector('.track__container');

// // min/max трэка и шаг трека
// const minScale = 10;
// const maxScale = 300;
// const step = 10
// minTrack.step = maxTrack.step = step;

// minInput.min = maxInput.min = minTrack.min = maxTrack.min = minScale;
// minInput.max = maxInput.max = minTrack.max = maxTrack.max = maxScale;

// // Начальные значения для инпутов
// minInput.value = minScale;
// maxInput.value = maxScale;
// minInput.step = minTrack.step;
// maxInput.step = maxTrack.step;

// // Начальные значения для трэка и шаг трека
// minTrack.value = minInput.value;
// maxTrack.value = maxInput.value;

// const minPercent = ((minTrack.value - minScale) / (maxScale - minScale)) * 100;
// const maxPercent = ((maxTrack.value - minScale) / (maxScale - minScale)) * 100;
// track.style.setProperty('--min-percent', minPercent + '%');
// track.style.setProperty('--max-percent', maxPercent + '%');

// // Функция обновления значения инпутов и трэка
// function updateSlider() {

//   const min = parseInt(minTrack.value);
//   const max = parseInt(maxTrack.value);
  
//   // Обновляем инпуты
//   minInput.value = min;
//   maxInput.value = max;
  
//   // Обновляем трек
//   const minPercent = ((minTrack.value - minScale) / (maxScale - minScale)) * 100;
//   const maxPercent = ((maxTrack.value - minScale) / (maxScale - minScale)) * 100;
//   track.style.setProperty('--min-percent', `${minPercent}%`);
//   track.style.setProperty('--max-percent', `${maxPercent}%`);
// }

// // Валидация минимального/максимального значений
// function validateMin() {
//   const min = parseInt(minTrack.value);
//   const max = parseInt(maxTrack.value);
  
//   if (min >= max) {
//     minTrack.value = max-step;
//   }

//   updateSlider();
// }

// function validateMax() {
//   const min = parseInt(minTrack.value);
//   const max = parseInt(maxTrack.value);
  
//   if (max <= min) {
//     maxTrack.value = min+step;
//   }

//   updateSlider();
// }

// // Добавляем слушателей на трэк
// minTrack.addEventListener('input', validateMin);
// maxTrack.addEventListener('input', validateMax);

// // Добавляем слушателей на инпуты
// minInput.addEventListener('change', function() {
//   let value = parseInt(minInput.value) || minScale;
//   if (value < minScale) {
//     value = minScale;
//   }
//   if (value > maxScale) {
//     value = maxScale;
//   }
//   minTrack.value = value;
//   validateMin();
// });

// maxInput.addEventListener('change', function() {
//   let value = parseInt(maxInput.value) || maxScale;
//   if (value < minScale) {
//     value = minScale;
//   }
//   if (value > maxScale) {
//     value = maxScale;
//   }
//   maxTrack.value = value;
//   validateMax();
// });

// updateSlider();