const policy = document.querySelector(`.policy`);
const button = policy.querySelector(`.policy__button`);

// Получаем значение куки, содержащей состояние окна политики
function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc;
    }, {})
}
const cookie = getCookie()

function checkPolicy() {
    if (cookie.policy != `true`) {
        policy.classList.remove(`policy__close`);
    }
}

checkPolicy();

// Функция закрытия окна политики по клику
function closePolicy() {
    policy.classList.add(`policy__close`);
    document.cookie = `policy=true`
}

button.addEventListener(`click`, closePolicy)

