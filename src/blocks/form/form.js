const form = document.querySelector(`.form`);
const inputs = form.querySelectorAll(`.form__input`);
const placeholders = form.querySelectorAll(`.form__placeholder`);

const inputOnChange = (evt) => {
  if (evt.target.value !== ``) {
    evt.target.nextElementSibling.classList.add(`form__placeholder--top`);
    } else {
    evt.target.nextElementSibling.classList.remove(`form__placeholder--top`);
  }
};

inputs.forEach((input) => {
  input.addEventListener(`input`, inputOnChange);
});

// Реализация маски ввода номера телефона
const phoneInput = document.querySelectorAll(`.form__input--phone`);

const inputPhoneChange = (evt) => {
  let value = evt.target.value.replace(/\D/g, ``).match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!value || !value[2]) {
    evt.target.value = value && value[1];
  } else if (!value[3]) {
  evt.target.value = `(${value[1]}) ${value[2]}`;
  } else if (!value[4]) {
  evt.target.value = `(${value[1]}) ${value[2]}-${value[3]}`;
  } else {
  evt.target.value = `(${value[1]}) ${value[2]}-${value[3]}-${value[4]}`;
  };
};

phoneInput.forEach((input) => {
  input.addEventListener(`input`, inputPhoneChange);
});