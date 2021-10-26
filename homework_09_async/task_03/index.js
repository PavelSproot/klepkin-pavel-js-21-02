
/*
Домашнее задание 9
Задача 3.
Реализовать страницу с таблицей. Таблица должна содержать инфрмацию, полученную
по API https://swapi.dev/api/people/ (массив объектов в свойстве "results").
А именно росте, весе и поле персонажей (поля "name", "height", "mass" и "gender" соответственно).
Опционально: предусмотреть возможность сортировки таблицы
Опционально: предусмотреть возможность перехода к следующей странице (ссылка содержится
в объекте API в свойстве "next") и предыдущей странице (ссылка содержится в объекте API в
свойстве "previous")
*/

console.log(`Домашне задание 9. Задача 3`);

// Переменные для сортировки
let sortOrder = 0;
let currentUrl = 'https://swapi.dev/api/people/';

// Основная табличка
const mainTable = document.createElement('table');
const mainTableCaption = mainTable.createCaption();
const mainTableHeader = mainTable.createTHead();
const mainTableBody = mainTable.createTBody();
const mainTableFooter = mainTable.createTFoot();

// Назначение стилей для таблицы
mainTable.classList.add('mainTable');
mainTableCaption.classList.add('mainTableCaption');
mainTableHeader.classList.add('mainTableHeader');

// Формируем заголовок таблицы
mainTableCaption.innerHTML = '<span><b>Информация о персонажах</b></span>';
const mainTableHeaderRow = document.createElement('tr');
const mainTableHeaderNameCell = document.createElement('td');
const mainTableHeaderHeightCell = document.createElement('td');
const mainTableHeaderMassCell = document.createElement('td');
const mainTableHeaderGenderCell = document.createElement('td');
const mainTableHeaderNameA = document.createElement('a');
const mainTableHeaderHeightA = document.createElement('a');
const mainTableHeaderMassA = document.createElement('a');
const mainTableHeaderGenderA = document.createElement('a');

// Заполняем загловок таблицы
mainTableHeaderNameCell.classList.add('colName');
mainTableHeaderHeightCell.classList.add('colHeight');
mainTableHeaderMassCell.classList.add('colMass');
mainTableHeaderGenderCell.classList.add('colGender');
mainTableHeaderNameA.innerText = 'Имя';
mainTableHeaderHeightA.innerText = 'Рост';
mainTableHeaderMassA.innerText = 'Вес';
mainTableHeaderGenderA.innerText = 'Пол';
// Назначаем эвент-хэндлеры для сортировки по нажатию на заголовке
mainTableHeaderNameA.addEventListener('click', () => { (sortOrder === 1)? sortOrder = 2 : sortOrder = 1; swapi.getPeople(fillTable, currentUrl);});
mainTableHeaderHeightA.addEventListener('click', () => { (sortOrder === 3)? sortOrder = 4 : sortOrder = 3; swapi.getPeople(fillTable, currentUrl);});
mainTableHeaderMassA.addEventListener('click', () => { (sortOrder === 5)? sortOrder = 6 : sortOrder = 5; swapi.getPeople(fillTable, currentUrl);});
mainTableHeaderGenderA.addEventListener('click', () => { (sortOrder === 7)? sortOrder = 8 : sortOrder = 7; swapi.getPeople(fillTable, currentUrl);});

mainTableHeaderNameCell.append(mainTableHeaderNameA);
mainTableHeaderHeightCell.append(mainTableHeaderHeightA);
mainTableHeaderMassCell.append(mainTableHeaderMassA);
mainTableHeaderGenderCell.append(mainTableHeaderGenderA);
mainTableHeaderRow.append(mainTableHeaderNameCell, mainTableHeaderHeightCell, mainTableHeaderMassCell, mainTableHeaderGenderCell);
mainTableHeader.append(mainTableHeaderRow);

// Создаем кнопки перелистывания страниц
const buttonsContainer = document.createElement('div');
const buttonPrevious = document.createElement('input');
const buttonNext = document.createElement('input');
buttonsContainer.classList.add('buttonsContainer');
buttonPrevious.type = 'button';
buttonNext.type = 'button';
buttonPrevious.value = 'Предыдущий';
buttonNext.value = 'Следующий';
buttonPrevious.disabled = true;
buttonNext.disabled = true;
// Назначаем эвент-хэндлеры для нажатий на кнопки
buttonPrevious.addEventListener('click', previousButtonHandle);
buttonNext.addEventListener('click', nextButtonHandle);
buttonsContainer.append(buttonPrevious, buttonNext);

const mainTableFooterRow = document.createElement('tr');
const mainTableFooterCol1 = document.createElement('td');
mainTableFooterCol1.colSpan = 4;
mainTableFooterCol1.append(buttonsContainer);
mainTableFooterRow.append(mainTableFooterCol1);
mainTableFooter.append(mainTableFooterRow);

document.body.append(mainTable);

// объект взамодействия с сервером
const swapi = {
    getPeople (callback, url) {
        currentUrl = url;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(callback);
    }
};

// Функция заполнения таблицы на основе переданного объекта с массивом данных
function fillTable (obj) {
    mainTableBody.innerHTML = '';
    const items = sortResults(obj.results); // Сортровка
    items.forEach(({name, height, mass, gender}) => {
        const newRow = document.createElement('tr');
        const newCellName = document.createElement('td');
        const newCellHeight = document.createElement('td');
        const newCellMass = document.createElement('td');
        const newCellGender = document.createElement('td');
        newCellName.classList.add('cellName');
        newCellHeight.classList.add('cellHeight');
        newCellMass.classList.add('cellMass');
        newCellGender.classList.add('cellGender');

        newCellName.innerText = name;
        newCellHeight.innerText = height;
        newCellMass.innerText = mass;
        newCellGender.innerText = gender;
        newRow.append(newCellName, newCellHeight, newCellMass, newCellGender);
        mainTableBody.append(newRow);
    });
    if (obj.next) {
        buttonNext.disabled = false;
        buttonNext.setAttribute('data-url', obj.next);
    } else {
        buttonNext.disabled = true;
    }
    if (obj.previous) {
        buttonPrevious.disabled = false;
        buttonPrevious.setAttribute('data-url', obj.previous);
    } else {
        buttonPrevious.disabled = true;
    }
}

// Функция сортировки
function sortResults (arr) {
    if (sortOrder !== 0) {
        const regexp = /^\d+\.*\d*$/; // Шаблон для проверки на число (для метода сравнения - либо, как числа, либо, как строки)
        let val1;
        let val2;
        return arr.sort((a, b) => {
            switch (sortOrder) {
                case 1: {
                    val1 = a.name;
                    val2 = b.name;
                    break;
                }
                case 2: {
                    val1 = b.name;
                    val2 = a.name;
                    break;
                }
                case 3: {
                    if (regexp.test(a.height) && regexp.test(b.height)) {
                        val1 = +a.height;
                        val2 = +b.height;
                    } else {
                        val1 = a.height;
                        val2 = b.height;
                    }
                    break;
                }
                case 4: {
                    if (regexp.test(a.height) && regexp.test(b.height)) {
                        val1 = +b.height;
                        val2 = +a.height;
                    } else {
                        val1 = b.height;
                        val2 = a.height;
                    }
                    break;
                }
                case 5: {
                    if (regexp.test(a.mass) && regexp.test(b.mass)) {
                        val1 = +a.mass;
                        val2 = +b.mass;
                    } else {
                        val1 = a.mass;
                        val2 = b.mass;
                    }
                    break;
                }
                case 6: {
                    if (regexp.test(a.mass) && regexp.test(b.mass)) {
                        val1 = +b.mass;
                        val2 = +a.mass;
                    } else {
                        val1 = b.mass;
                        val2 = a.mass;
                    }
                    break;
                }
                case 7: {
                    val1 = a.gender;
                    val2 = b.gender;
                    break;
                }
                case 8: {
                    val1 = b.gender;
                    val2 = a.gender;
                    break;
                }
                default: break;
            }
            if (val1 > val2) {
                return 1;
            } else if (val1 < val2) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    return arr;
}

// обработчик нажатия кнопки Следующий
function nextButtonHandle (e) {
    swapi.getPeople(fillTable, e.target.dataset.url);
}

// обработчик нажатия кнопки Предыдущий
function previousButtonHandle (e) {
    swapi.getPeople(fillTable, e.target.dataset.url);
}

// Стартовое заполнение таблицы
swapi.getPeople(fillTable, currentUrl);



