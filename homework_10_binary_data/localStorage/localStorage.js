export const localStorageImages = {
    initiate () {
        this.itemArr = localStorage.getItem('imgs') ? JSON.parse(localStorage.getItem('imgs')) : [];
    },
    getItems () {
        return this.itemArr;
    },
    addItemToStorage (item) {
        this.itemArr.push(item);
        localStorage.setItem('imgs', JSON.stringify(this.itemArr));
    }
}