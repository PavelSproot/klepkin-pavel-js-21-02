import {LOADER_SIZE} from "../constants/loader.js";

export class Loader {
    visible = false;
    mainContainer = document.createElement('div');
    pointer = document.createElement('div');
    loaderWidth = LOADER_SIZE;
    loaderHeight = LOADER_SIZE;
    pointerWidth = Math.floor(LOADER_SIZE / 10);
    pointerHeight = Math.floor(LOADER_SIZE / 10);
    positionX = 0;
    positionY = 0;
    radius = 0;
    constructor () {
        this.mainContainer.classList.add('loader');
        this.pointer.classList.add('loader__pointer');

        this.setPointerDefaultPosition();
        this.setSizes(LOADER_SIZE, LOADER_SIZE);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './css/loader.css';
        document.head.append(link);
        this.mainContainer.append(this.pointer);
        this.drawPointer();
        this.displayLoader(false);
    }
    setSizes (width, height) {
        this.loaderWidth = width;
        this.loaderHeight = height;
        this.pointerWidth = Math.floor(width / 5);
        this.pointerHeight = Math.floor(height / 5);
        this.radius = (this.loaderWidth > this.loaderHeight) ? (this.loaderHeight - this.pointerHeight) / 2 : (this.loaderWidth - this.pointerWidth) / 2;

        this.mainContainer.style.width = this.loaderWidth + "px";
        this.mainContainer.style.height = this.loaderHeight + "px";
        this.pointer.style.width = this.pointerWidth + "px";
        this.pointer.style.height = this.pointerHeight + "px";
    }
    insertInTo (elem) {
        elem.append(this.mainContainer);
    }
    displayLoader(vis = true) {
        if (vis) {
            this.setPointerDefaultPosition();
            this.drawPointer ();
            this.mainContainer.style.display = 'flex';
            this.visible = true;
        } else {
            this.mainContainer.style.display = 'none';
            this.visible = false;
        }

    }
    setPointerDefaultPosition() {
        this.positionX = Math.floor(this.loaderWidth / 2 - this.pointerWidth / 2);
        this.positionY = Math.floor(this.loaderHeight - this.pointerHeight);
    }
    drawPointer () {
        this.pointer.style.left = this.positionX + "px";
        this.pointer.style.top = this.positionY + "px";
    }
    doAnimation () {
        let f = 0;
        const s = 2 * Math.PI / 180; //Вычислим угол
        this.interval = setInterval(() => { // функция движения
            f += s; // приращение аргумента
            this.positionX =  this.loaderWidth / 2 - this.pointerWidth / 2 + this.radius * Math.sin(f);
            this.positionY =  this.loaderHeight / 2 - this.pointerHeight / 2  + this.radius * Math.cos(f);
            this.drawPointer();
        }, 5);
    }
    stopAnimation () {
        clearInterval(this.interval);
    }

}