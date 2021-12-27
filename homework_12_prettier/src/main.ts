import { HeroTable } from './heroTable';

const tableContainer: HTMLElement = document.getElementById('mainTable');

const heroTable: HeroTable = new HeroTable();
tableContainer.append(heroTable.getMainTable());
