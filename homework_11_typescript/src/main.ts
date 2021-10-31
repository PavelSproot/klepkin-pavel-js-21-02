import {HeroTable} from "./heroTable";

const tableContainer = document.getElementById('mainTable');

const heroTable = new HeroTable();
tableContainer.append(heroTable.getMainTable());

