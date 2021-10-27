/*
Разработать страницу, подобную разработанной в ходе урока. Страница должна
содержать инпут для ввода файла и дальнейшей отправки на сервер по API https://api.imgbb.com/.
Отправляемый файл должен быть закодирован в base64. Отправленные изображения должны выводиться
на страницу. Приходящие в ответе от сервера ссылки на изображения должны сохраняться в localStorage.
Если при загрузке страницы в localStorage уже есть сохранённые ссылки на изображения, эти изображения
должны выводиться на страницу. При выполнении задания необходимо соблюдать модульную
структуру (подобную продемонстрированной в уроке посвящённому модулям).
*Опционально: При загрузке очередного изображения на сервер необходимо отображать над инпутом лоадер,
анимированный на js.
В ответе на домашнее задание прикрепить ссылку на GitHub и ссылку на профиль в imgbb.
*/


const imgbbApiUrl = 'https://api.imgbb.com/1/upload';
const imgbbApiKey = '355089e1fc59f95b6861429414febee4';

const localStorageImgs = localStorage.getItem('imgs') ? JSON.parse(localStorage.getItem('imgs')) : [];
console.log(localStorageImgs);

uploadFile =  document.getElementById('uploadFile');
uploadButton = document.getElementById('uploadButton');
localGallery = document.getElementById('localGallery');

uploadButton.addEventListener('click', uplodFileBase64);


if (localStorageImgs.length > 0) {
    localStorageImgs.forEach(displayImage)
}


function addItemToStorage (item) {
    localStorageImgs.push(item);
    localStorage.setItem('imgs', JSON.stringify(localStorageImgs));
}

function displayImage (base64img) {
    const img = document.createElement('img');
    img.src = base64img;
    localGallery.append(img);
}

function uplodFileBase64 () {
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile.files[0]);
    reader.onload = () => {
        uploadFileToImgbb(reader.result);
    };
}

function uploadFileToImgbb (file) {
    const formData = new FormData();
    formData.set('key', imgbbApiKey);
    formData.set('image', file.replace(/^.*,/, ''));
    fetch(imgbbApiUrl, {
        method: 'POST',
        body: formData
    })
        .then (response => response.json())
        .then (response => {
            addItemToStorage(response.data.display_url);
            displayImage(response.data.display_url);
        })
}