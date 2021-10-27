import {imgbbApi} from "../api/imgbbapi.js";
import {localStorageImages} from "../localStorage/localStorage.js";
import {Loader} from "./loader.js";

export const imageGallery = {
    initiate() {
        this.mainContainer = document.createElement('div');
        this.header = document.createElement('h3');
        this.loaderContainer = document.createElement('div');
        this.uploadFile = document.createElement('input');
        this.uploadButton = document.createElement('input');
        this.imageList = document.createElement('div');

        this.mainContainer.classList.add('gallery');
        this.imageList.classList.add('gallery__imageList');
        this.loaderContainer.classList.add('gallery__loader');
        this.header.innerText = 'Галерея';
        this.uploadFile.type = 'file';
        this.uploadButton.type = 'button';
        this.uploadButton.value = 'Отправить'
        this.uploadButton.addEventListener('click', () => {
            this.uploadFileBase64();
        });

        this.mainContainer.append(this.header);
        this.mainContainer.append(this.loaderContainer);
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

        this.loader = new Loader();
        this.loader.insertInTo(this.loaderContainer);
        this.loaderContainer.style.height = this.loader.loaderHeight + "px";
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
        this.loader.displayLoader(false);
        this.loader.stopAnimation();
        localStorageImages.addItemToStorage(res.data.display_url);
        this.displayGalleryImage(res.data.display_url);
    },
    doErrorMessage () {
        this.loader.displayLoader(false);
        this.loader.stopAnimation();
        console.log(`Чтото пошло не так...`)
    },
    uploadFileBase64 () {
        this.loader.displayLoader(true);
        this.loader.doAnimation();
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadFile.files[0]);
        reader.onload = () => {
            imgbbApi.uploadFileToImgbb(reader.result, (res) => this.handleResult(res), () => this.doErrorMessage())
        };
    }
}