export default class LocalStorageAuth {
  userID: string = '';

  keyName: string = 'abauth';

  constructor() {
    const storageItems = localStorage.getItem(this.keyName);
    this.userID = storageItems || '';
  }

  getItem() {
    return this.userID;
  }

  removeItemFromStorage(): void {
    localStorage.removeItem(this.keyName);
  }

  addItemToStorage(item: string) {
    this.userID = item;
    localStorage.setItem(this.keyName, this.userID);
  }
}
