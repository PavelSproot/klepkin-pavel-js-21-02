import {imgbbApi} from "../api/imgbbapi.js";
import {localStorageImages} from "../localStorage/localStorage.js";

export const imageGallery = {
    initiate() {
        this.mainContainer = document.createElement('div');
        this.uploadFile = document.createElement('input');
        this.uploadButton = document.createElement('input');
        this.imageList = document.createElement('div');
        this.header = document.createElement('h3');

        this.imageList.classList.add('gallery__imageList');
        this.header.innerText = 'Галерея';
        this.uploadFile.type = 'file';
        this.uploadButton.type = 'button';
        this.uploadButton.value = 'Отправить'
        this.uploadButton.addEventListener('click', () => {
            const reader = new FileReader();
            reader.readAsDataURL(this.uploadFile.files[0]);
            reader.onload = () => {
                imgbbApi.uploadFileToImgbb(reader.result, (res) => this.uploadFileBase64(res), () => this.doErrorMessage());
            }
        });

        this.mainContainer.append(this.header);
        this.mainContainer.append(this.uploadFile);
        this.mainContainer.append(this.uploadButton);
        this.mainContainer.append(this.imageList);

        localStorageImages.initiate();
        if (localStorageImages.getItems().length > 0) {
            localStorageImages.getItems().forEach(item => this.displayGalleryImage(item));
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './css/gallery.css';
        document.head.append(link);
    },
    displayGalleryImage (base64img) {
        const img = document.createElement('img');
        img.classList.add('gallery__image');
        img.src = base64img;
        this.imageList.append(img);
    },
    insertInTo (elem) {
        elem.append(this.mainContainer);
    },
    handleResult (res) {
        localStorageImages.addItemToStorage(res.data.display_url);
        this.displayGalleryImage(res.data.display_url);
    },
    doErrorMessage () {
        console.log(`Чтото пошло не так...`)
    },
    uploadFileBase64 () {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadFile.files[0]);
        reader.onload = () => {
            imgbbApi.uploadFileToImgbb(reader.result, (res) => this.handleResult(res), () => this.doErrorMessage())
        };
    }
}