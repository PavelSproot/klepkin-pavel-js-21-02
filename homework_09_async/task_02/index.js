
/*
Домашнее задание 9
Задача 2.
Реализовать страницу, через десять секунд перенаправляющую на главную
страницу https://maxima.life (для редиректа поменять свойство window.location)
на странице вывести сообщение "вы будете перенаправлены через /количество оставшихся
секунд/" секунд
Опционально: предусмотреть склонение слова "секунда"
*/

console.log(`Домашне задание 9. Задача 2`);

let secCount = 10;

const words = ['секунда', 'секунды', 'секунд', 'секунду'];
function getSecondsName (val) {
    val = val % 100;
    var num = val % 10;
    if(val > 10 && val < 20) return words[2];
    if(num > 1 && num < 5) return words[1];
    if(num === 1) return words[3];
    return words[2];
}

function changeTimeOnPage (elemDig, elemSec, val) {
    elemDig.innerText = val;
    elemSec.innerText = ' ' + getSecondsName(val);
}

function changeSecCallback () {
    if (secCount > 0) {
        --secCount;
        changeTimeOnPage(spanDig, spanSec, secCount);
    } else {
        clearInterval(interval);
        window.location = "https://maxima.life";
    }
}

const div = document.createElement('div');
const spanMsg = document.createElement('span');
const spanDig = document.createElement('span');
const spanSec = document.createElement('span');

spanMsg.innerText = 'Вы будете перенаправлены через ';
spanDig.innerText = secCount;
spanSec.innerText = ' ' + getSecondsName(secCount);

div.append(spanMsg);
div.append(spanDig);
div.append(spanSec);

document.body.append(div);

const interval = setInterval(changeSecCallback, 1000);

