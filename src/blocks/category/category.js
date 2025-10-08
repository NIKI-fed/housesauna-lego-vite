const buttons = document.querySelectorAll('.category__button');
const sublists = document.querySelectorAll('.category__sublist');

// Функция закрывает все подменю и сбрасывает состояние кнопок
function closeAllSubLists() {
    sublists.forEach(sublist => {
        sublist.classList.remove('category__sublist--visible');
    });
    buttons.forEach(button => {
        button.classList.remove('category__button--push', 'category__button-arrow--push');
        button.classList.add('category__button-arrow');
    });
};

// Функция открывает выбранное подменю и обновляет состояние кнопок
function openSelectedSubList(selectedButton, selectedSublist) {
    closeAllSubLists(); // Сначала закроем все подменю
    selectedSublist.classList.add('category__sublist--visible');
    selectedButton.classList.add('category__button--push', 'category__button-arrow--push');
};

// ***Обработчики***

// Обработчик клика по кнопкам
buttons.forEach((button, index) => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();

        const currentButton = button;
        const currentSublist = sublists[index];
        
        if (currentSublist.classList.contains('category__sublist--visible')) {
            closeAllSubLists();
        } else {
            openSelectedSubList(currentButton, currentSublist);
        }
    });
});

// Закрытие подменю при клике вне области
document.addEventListener('click', closeAllSubLists);

// Предотвращение закрытия при клике внутри открытых подменю
sublists.forEach(sublist => {
    sublist.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
