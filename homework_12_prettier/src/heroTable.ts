import { Swapi, SwapiResultType, SwapiResultItemType } from './swapi';

export class HeroTable {
  sortOrder = 0;

  currentUrl = 'https://swapi.dev/api/people/';

  swapi: Swapi = new Swapi();

  mainTable: HTMLTableElement = document.createElement('table');

  mainTableCaption: HTMLTableCaptionElement = this.mainTable.createCaption();

  mainTableHeader: HTMLTableSectionElement = this.mainTable.createTHead();

  mainTableBody: HTMLTableSectionElement = this.mainTable.createTBody();

  mainTableFooter: HTMLTableSectionElement = this.mainTable.createTFoot();

  // Создаем кнопки перелистывания страниц
  buttonsContainer: HTMLElement = document.createElement('div');

  buttonPrevious: HTMLButtonElement = document.createElement('input');

  buttonNext: HTMLButtonElement = document.createElement('input');

  constructor() {
    // Назначение стилей для таблицы
    this.mainTable.classList.add('mainTable');
    this.mainTableCaption.classList.add('mainTableCaption');
    this.mainTableHeader.classList.add('mainTableHeader');

    // Формируем заголовок таблицы
    this.mainTableCaption.innerHTML = '<span><b>Информация о персонажах</b></span>';
    const mainTableHeaderRow: HTMLTableRowElement = document.createElement('tr');
    const mainTableHeaderNameCell: HTMLTableCellElement = document.createElement('td');
    const mainTableHeaderHeightCell: HTMLTableCellElement = document.createElement('td');
    const mainTableHeaderMassCell: HTMLTableCellElement = document.createElement('td');
    const mainTableHeaderGenderCell: HTMLTableCellElement = document.createElement('td');
    const mainTableHeaderNameA: HTMLAnchorElement = document.createElement('a');
    const mainTableHeaderHeightA: HTMLAnchorElement = document.createElement('a');
    const mainTableHeaderMassA: HTMLAnchorElement = document.createElement('a');
    const mainTableHeaderGenderA: HTMLAnchorElement = document.createElement('a');

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
    mainTableHeaderRow.append(mainTableHeaderNameCell, mainTableHeaderHeightCell,
        mainTableHeaderMassCell, mainTableHeaderGenderCell);
    this.mainTableHeader.append(mainTableHeaderRow);

    // Назначаем эвент-хэндлеры для сортировки по нажатию на заголовке
    mainTableHeaderNameA.addEventListener('click', (): void => { (this.sortOrder === 1) ? this.sortOrder = 2 : this.sortOrder = 1; this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl); });
    mainTableHeaderHeightA.addEventListener('click', (): void => { (this.sortOrder === 3) ? this.sortOrder = 4 : this.sortOrder = 3; this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl); });
    mainTableHeaderMassA.addEventListener('click', (): void => { (this.sortOrder === 5) ? this.sortOrder = 6 : this.sortOrder = 5; this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl); });
    mainTableHeaderGenderA.addEventListener('click', (): void => { (this.sortOrder === 7) ? this.sortOrder = 8 : this.sortOrder = 7; this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl); });

    this.buttonsContainer.classList.add('buttonsContainer');
    this.buttonPrevious.type = 'button';
    this.buttonNext.type = 'button';
    this.buttonPrevious.value = 'Предыдущий';
    this.buttonNext.value = 'Следующий';
    this.buttonPrevious.disabled = true;
    this.buttonNext.disabled = true;
    // Назначаем эвент-хэндлеры для нажатий на кнопки
    this.buttonPrevious.addEventListener('click', (): void => this.previousButtonHandle());
    this.buttonNext.addEventListener('click', (): void => this.nextButtonHandle());
    this.buttonsContainer.append(this.buttonPrevious, this.buttonNext);

    const mainTableFooterRow: HTMLTableRowElement = document.createElement('tr');
    const mainTableFooterCol1: HTMLTableCellElement = document.createElement('td');
    mainTableFooterCol1.colSpan = 4;
    mainTableFooterCol1.append(this.buttonsContainer);
    mainTableFooterRow.append(mainTableFooterCol1);
    this.mainTableFooter.append(mainTableFooterRow);

    this.swapi.getPeople((obj: SwapiResultType): void => this.fillTable(obj), this.currentUrl);
  }

  getMainTable(): HTMLTableElement {
    return this.mainTable;
  }

  // Метод заполнения таблицы на основе переданного объекта с массивом данных
  fillTable(obj: SwapiResultType): void {
    this.mainTableBody.innerHTML = '';
    const items: SwapiResultItemType[] = this.sortResults(obj.results); // Сортровка
    items.forEach(({
      name, height, mass, gender,
    }: SwapiResultItemType): void => {
      const newRow: HTMLTableRowElement = document.createElement('tr');
      const newCellName: HTMLTableCellElement = document.createElement('td');
      const newCellHeight: HTMLTableCellElement = document.createElement('td');
      const newCellMass: HTMLTableCellElement = document.createElement('td');
      const newCellGender: HTMLTableCellElement = document.createElement('td');
      newCellName.classList.add('cellName');
      newCellHeight.classList.add('cellHeight');
      newCellMass.classList.add('cellMass');
      newCellGender.classList.add('cellGender');

      newCellName.innerText = name;
      newCellHeight.innerText = height;
      newCellMass.innerText = mass;
      newCellGender.innerText = gender;
      newRow.append(newCellName, newCellHeight, newCellMass, newCellGender);
      this.mainTableBody.append(newRow);
    });
    if (obj.next) {
      this.buttonNext.disabled = false;
      this.buttonNext.setAttribute('data-url', obj.next);
    } else {
      this.buttonNext.disabled = true;
    }
    if (obj.previous) {
      this.buttonPrevious.disabled = false;
      this.buttonPrevious.setAttribute('data-url', obj.previous);
    } else {
      this.buttonPrevious.disabled = true;
    }
  }

  // Метод сортировки
  sortResults(arr: SwapiResultItemType[]): SwapiResultItemType[] {
    if (this.sortOrder !== 0) {
      const regexp = /^\d+\.*\d*$/; // Шаблон для проверки на число (для метода сравнения - либо, как числа, либо, как строки)
      let val1: number | string;
      let val2: number | string;
      return arr.sort((a: SwapiResultItemType, b: SwapiResultItemType): number => {
        switch (this.sortOrder) {
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
        } if (val1 < val2) {
          return -1;
        }
        return 0;
      });
    }
    return arr;
  }

  // обработчик нажатия кнопки Следующий
  nextButtonHandle(): void {
    this.currentUrl = this.buttonNext.dataset.url;
    this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl);
  }

  // обработчик нажатия кнопки Предыдущий
  previousButtonHandle(): void {
    this.currentUrl = this.buttonPrevious.dataset.url;
    this.swapi.getPeople((e: SwapiResultType): void => this.fillTable(e), this.currentUrl);
  }
}
