export default class LocalStorageTodoList {
  itemArr: Array<string>;

  constructor() {
    const storageItems = localStorage.getItem('todolist');
    this.itemArr = storageItems ? JSON.parse(storageItems) : [];
  }

  getItems() {
    return this.itemArr;
  }

  addItemToStorage(item: string) {
    this.itemArr.push(item);
    localStorage.setItem('todolist', JSON.stringify(this.itemArr));
  }

  removeItemFromStorage(idx: number) {
    this.itemArr = this.itemArr.slice(0, idx).concat(this.itemArr.slice(idx + 1));
    localStorage.setItem('todolist', JSON.stringify(this.itemArr));
  }
}
