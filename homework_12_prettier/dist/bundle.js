(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroTable = void 0;
var swapi_1 = require("./swapi");
var HeroTable = /** @class */ (function () {
    function HeroTable() {
        var _this = this;
        this.sortOrder = 0;
        this.currentUrl = 'https://swapi.dev/api/people/';
        this.swapi = new swapi_1.Swapi();
        this.mainTable = document.createElement('table');
        this.mainTableCaption = this.mainTable.createCaption();
        this.mainTableHeader = this.mainTable.createTHead();
        this.mainTableBody = this.mainTable.createTBody();
        this.mainTableFooter = this.mainTable.createTFoot();
        // Создаем кнопки перелистывания страниц
        this.buttonsContainer = document.createElement('div');
        this.buttonPrevious = document.createElement('input');
        this.buttonNext = document.createElement('input');
        // Назначение стилей для таблицы
        this.mainTable.classList.add('mainTable');
        this.mainTableCaption.classList.add('mainTableCaption');
        this.mainTableHeader.classList.add('mainTableHeader');
        // Формируем заголовок таблицы
        this.mainTableCaption.innerHTML = '<span><b>Информация о персонажах</b></span>';
        var mainTableHeaderRow = document.createElement('tr');
        var mainTableHeaderNameCell = document.createElement('td');
        var mainTableHeaderHeightCell = document.createElement('td');
        var mainTableHeaderMassCell = document.createElement('td');
        var mainTableHeaderGenderCell = document.createElement('td');
        var mainTableHeaderNameA = document.createElement('a');
        var mainTableHeaderHeightA = document.createElement('a');
        var mainTableHeaderMassA = document.createElement('a');
        var mainTableHeaderGenderA = document.createElement('a');
        // Заполняем загловок таблицы
        mainTableHeaderNameCell.classList.add('colName');
        mainTableHeaderHeightCell.classList.add('colHeight');
        mainTableHeaderMassCell.classList.add('colMass');
        mainTableHeaderGenderCell.classList.add('colGender');
        mainTableHeaderNameA.innerText = 'Имя';
        mainTableHeaderHeightA.innerText = 'Рост';
        mainTableHeaderMassA.innerText = 'Вес';
        mainTableHeaderGenderA.innerText = 'Пол';
        mainTableHeaderNameCell.append(mainTableHeaderNameA);
        mainTableHeaderHeightCell.append(mainTableHeaderHeightA);
        mainTableHeaderMassCell.append(mainTableHeaderMassA);
        mainTableHeaderGenderCell.append(mainTableHeaderGenderA);
        mainTableHeaderRow.append(mainTableHeaderNameCell, mainTableHeaderHeightCell, mainTableHeaderMassCell, mainTableHeaderGenderCell);
        this.mainTableHeader.append(mainTableHeaderRow);
        // Назначаем эвент-хэндлеры для сортировки по нажатию на заголовке
        mainTableHeaderNameA.addEventListener('click', function () { (_this.sortOrder === 1) ? _this.sortOrder = 2 : _this.sortOrder = 1; _this.swapi.getPeople(function (e) { return _this.fillTable(e); }, _this.currentUrl); });
        mainTableHeaderHeightA.addEventListener('click', function () { (_this.sortOrder === 3) ? _this.sortOrder = 4 : _this.sortOrder = 3; _this.swapi.getPeople(function (e) { return _this.fillTable(e); }, _this.currentUrl); });
        mainTableHeaderMassA.addEventListener('click', function () { (_this.sortOrder === 5) ? _this.sortOrder = 6 : _this.sortOrder = 5; _this.swapi.getPeople(function (e) { return _this.fillTable(e); }, _this.currentUrl); });
        mainTableHeaderGenderA.addEventListener('click', function () { (_this.sortOrder === 7) ? _this.sortOrder = 8 : _this.sortOrder = 7; _this.swapi.getPeople(function (e) { return _this.fillTable(e); }, _this.currentUrl); });
        this.buttonsContainer.classList.add('buttonsContainer');
        this.buttonPrevious.type = 'button';
        this.buttonNext.type = 'button';
        this.buttonPrevious.value = 'Предыдущий';
        this.buttonNext.value = 'Следующий';
        this.buttonPrevious.disabled = true;
        this.buttonNext.disabled = true;
        // Назначаем эвент-хэндлеры для нажатий на кнопки
        this.buttonPrevious.addEventListener('click', function () { return _this.previousButtonHandle(); });
        this.buttonNext.addEventListener('click', function () { return _this.nextButtonHandle(); });
        this.buttonsContainer.append(this.buttonPrevious, this.buttonNext);
        var mainTableFooterRow = document.createElement('tr');
        var mainTableFooterCol1 = document.createElement('td');
        mainTableFooterCol1.colSpan = 4;
        mainTableFooterCol1.append(this.buttonsContainer);
        mainTableFooterRow.append(mainTableFooterCol1);
        this.mainTableFooter.append(mainTableFooterRow);
        this.swapi.getPeople(function (obj) { return _this.fillTable(obj); }, this.currentUrl);
    }
    HeroTable.prototype.getMainTable = function () {
        return this.mainTable;
    };
    // Метод заполнения таблицы на основе переданного объекта с массивом данных
    HeroTable.prototype.fillTable = function (obj) {
        var _this = this;
        this.mainTableBody.innerHTML = '';
        var items = this.sortResults(obj.results); // Сортровка
        items.forEach(function (_a) {
            var name = _a.name, height = _a.height, mass = _a.mass, gender = _a.gender;
            var newRow = document.createElement('tr');
            var newCellName = document.createElement('td');
            var newCellHeight = document.createElement('td');
            var newCellMass = document.createElement('td');
            var newCellGender = document.createElement('td');
            newCellName.classList.add('cellName');
            newCellHeight.classList.add('cellHeight');
            newCellMass.classList.add('cellMass');
            newCellGender.classList.add('cellGender');
            newCellName.innerText = name;
            newCellHeight.innerText = height;
            newCellMass.innerText = mass;
            newCellGender.innerText = gender;
            newRow.append(newCellName, newCellHeight, newCellMass, newCellGender);
            _this.mainTableBody.append(newRow);
        });
        if (obj.next) {
            this.buttonNext.disabled = false;
            this.buttonNext.setAttribute('data-url', obj.next);
        }
        else {
            this.buttonNext.disabled = true;
        }
        if (obj.previous) {
            this.buttonPrevious.disabled = false;
            this.buttonPrevious.setAttribute('data-url', obj.previous);
        }
        else {
            this.buttonPrevious.disabled = true;
        }
    };
    // Метод сортировки
    HeroTable.prototype.sortResults = function (arr) {
        var _this = this;
        if (this.sortOrder !== 0) {
            var regexp_1 = /^\d+\.*\d*$/; // Шаблон для проверки на число (для метода сравнения - либо, как числа, либо, как строки)
            var val1_1;
            var val2_1;
            return arr.sort(function (a, b) {
                switch (_this.sortOrder) {
                    case 1: {
                        val1_1 = a.name;
                        val2_1 = b.name;
                        break;
                    }
                    case 2: {
                        val1_1 = b.name;
                        val2_1 = a.name;
                        break;
                    }
                    case 3: {
                        if (regexp_1.test(a.height) && regexp_1.test(b.height)) {
                            val1_1 = +a.height;
                            val2_1 = +b.height;
                        }
                        else {
                            val1_1 = a.height;
                            val2_1 = b.height;
                        }
                        break;
                    }
                    case 4: {
                        if (regexp_1.test(a.height) && regexp_1.test(b.height)) {
                            val1_1 = +b.height;
                            val2_1 = +a.height;
                        }
                        else {
                            val1_1 = b.height;
                            val2_1 = a.height;
                        }
                        break;
                    }
                    case 5: {
                        if (regexp_1.test(a.mass) && regexp_1.test(b.mass)) {
                            val1_1 = +a.mass;
                            val2_1 = +b.mass;
                        }
                        else {
                            val1_1 = a.mass;
                            val2_1 = b.mass;
                        }
                        break;
                    }
                    case 6: {
                        if (regexp_1.test(a.mass) && regexp_1.test(b.mass)) {
                            val1_1 = +b.mass;
                            val2_1 = +a.mass;
                        }
                        else {
                            val1_1 = b.mass;
                            val2_1 = a.mass;
                        }
                        break;
                    }
                    case 7: {
                        val1_1 = a.gender;
                        val2_1 = b.gender;
                        break;
                    }
                    case 8: {
                        val1_1 = b.gender;
                        val2_1 = a.gender;
                        break;
                    }
                    default: break;
                }
                if (val1_1 > val2_1) {
                    return 1;
                }
                else if (val1_1 < val2_1) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        }
        return arr;
    };
    // обработчик нажатия кнопки Следующий
    HeroTable.prototype.nextButtonHandle = function () {
        var _this = this;
        this.currentUrl = this.buttonNext.dataset.url;
        this.swapi.getPeople(function (e) { return _this.fillTable(e); }, this.currentUrl);
    };
    // обработчик нажатия кнопки Предыдущий
    HeroTable.prototype.previousButtonHandle = function () {
        var _this = this;
        this.currentUrl = this.buttonPrevious.dataset.url;
        this.swapi.getPeople(function (e) { return _this.fillTable(e); }, this.currentUrl);
    };
    return HeroTable;
}());
exports.HeroTable = HeroTable;

},{"./swapi":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var heroTable_1 = require("./heroTable");
var tableContainer = document.getElementById('mainTable');
var heroTable = new heroTable_1.HeroTable();
tableContainer.append(heroTable.getMainTable());

},{"./heroTable":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swapi = void 0;
// объект взамодействия с сервером
var Swapi = /** @class */ (function () {
    function Swapi() {
    }
    Swapi.prototype.getPeople = function (callback, url) {
        fetch(url)
            .then(function (response) {
            return response.json();
        })
            .then(function (res) { return callback(res); });
    };
    return Swapi;
}());
exports.Swapi = Swapi;

},{}]},{},[2]);
