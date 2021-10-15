
/* Задание 1. Написать скрипт, предлагающий пользователю ввести две строки через запятую.
Вывести сообщение true, если вторая строка содержится в первый, в противном случае false,
регистр при проверке не учитывать.
*/
/*
// const twoStrings = "Самая лучшая строка,самая";
const twoStrings = prompt("Задание 1.\nВведите две строки через запятую...");
let result = false;
if (twoStrings !== null && twoStrings !== '') {
    const arr = twoStrings.toLowerCase().split(",");
    if (arr.length > 1) {
        result = arr[0].includes(arr[1]);
    }
}
alert(result);
*/

/* Задание 2. Пользователь вводит строку, затем число (кол-во символов).
Функция усекает строку до кол-ва символов и добавляет многоточие.
*/
/*
function CutString (str, num) {
    if (str.length > num) {
        str = str.substr(0, num).concat('...');
    }
    return str;
}
// const inputStr = "Слишком длинная строка";
// const inputNum = 12;
const inputStr = prompt("Задание 2.\nВведите строку");
const inputNum = prompt("Задание 2.\nВведите количество символов, до которого усекается строка");
if (inputStr !== null && inputNum !== null && inputStr !== '' && inputNum !== '') {
    alert (CutString (inputStr, inputNum));
}
*/

/* Задание 3. Написать функцию, преобразующее строку с датой и временем
формата '12/02/2021 12-00' в строку формата 12.02.2021 12:00, используя
регулярные выражения
*/
/*
function TransformDate (datestr) {
    const regexp = /^\d{2}\/\d{2}\/\d{4} \d{2}-\d{2}$/;
    if (!regexp.test(datestr)) {
        return "Неверный формат даты!";
    }
    return datestr.replace(/\//g, ".").replace(/-/g, ":");
}
// const userDate = "12/02/2021 12-00";
const userDate = prompt("Задание 3.\nВведите дату в формате 12/02/2021 12-00");
if (userDate !== null && userDate !== '') {
    alert(TransformDate(userDate));
}
*/

/* Задание 4. Написать функцию, валидирующую ФИО из кирилличиских символов
(считать, что отчество может оканчиваться только на "вна" или "вич" или может
отсутствовать)
*/

function CheckName (name) {
    const regexp = /^[а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+( [а-яА-ЯёЁ]+(вич|вна)+)*$/;
    return regexp.test(name);
}

// const userName = "Петров Иван Сергеевич";
// const userName = "Петров Иван";
const userName = prompt("Задание 4.\nВведите ФИО");
if (userName !== null && userName !== '') {
    alert(CheckName(userName));
}


/* Задание 5. На вход дана строка в PamalCase, преобразовать строку в snake_case
 */

function TransformPalmToSnake (str) {
    const regexp = /[A-ZА-ЯЁ][a-zа-яё]*/g;
    return str.match(regexp).join("_").toLowerCase();
}
// const pamalStr = "ThisIsSuperString";
const pamalStr = prompt("Задание 5.\nВведите строку в формате PamalCase");
if (pamalStr !== null && pamalStr !== '') {
    alert(TransformPalmToSnake(pamalStr));
}


/* Задание 6. На вход даётся многострочная строка, найти и вернуть через alert
все html комментарии
*/

/*
const txt = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ru">
 <head>
   <title>Комментарии</title>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
 </head>
 <body> 

  <!-- Меню нашего сайта -->
  <div>Меню</div>

  <!-- Контент сайта-->
  <div>Содержимое документа</div>
  
<!--Здесь может быть
Многострочный
Комментарий-->
    <div>Блок1</div>
    <div>Блок2</div>
<!--
Еще один
Многострочный
Комментарий
-->

 </body> 
</html>
`;
*/

function GetComments(str) {
    const regexp = /(?<=<!--).+?(?=(-->))/gs;
    return str.match(regexp).map(st => st.trim());
}

const txt = prompt("Задание 6.\nВведите HTML текст");
if (txt !== null && txt !== '') {
    alert (GetComments(txt));
}



/* Задание 7. На вход дана строка, вернуть через alert все числа (десятичные
разделяются сиволом ".")
*/

function GetNumbers (str) {
    const regexp = /(?<=^|\D)\d+\.*\d*(?=\D|$)/g;
    return str.match(regexp);
}
//const numbers = "k1kk 444.23kjhhkhj0.1Lkjhjh4444llkkjopii36kjkhjе543lkk";
const numbers = prompt("Задание 7.\nВведите строку с числами");
if (numbers != null && numbers !== '') {
    alert(GetNumbers(numbers));
}


/* 8. Валидация введённого значения. Вводится идентификатор документа.
Идентификатор должен состоять из четырёх частей по четыре символа,разделённых
или не разделённых знаком "-". Допускаются только символы латинского алфавита и числа.
Вывести через alert "ведётся поиск", при соответствии введённого значения, или
"неверный илентификатор", при несоответствии. При несоответствии снова вывести форму
для ввода строки.
 */
/*
function CheckId (str) {
    const regexp = /^([a-zA-Z\d]{4}(-(?!$))?){4}$/; // 4 секции по 4 буквы/цифры разделенные или не разделенные минусом, в конце и в начале минус недопустим.
    return regexp.test(str);
}

let canExit = false;
do {
//    const docId = "55r0yjyhfff00334";
    const docId = prompt("Задание 8.\nВведите идентификатор документа");
    if (docId != null) {
        let outMsg;
        if (CheckId(docId)) {
            canExit = true;
            outMsg = "Ведется поиск...";
        } else {
            outMsg = "Неверный идентификатор";
        }
        alert (outMsg);
    } else {
        canExit = true;
    }
} while (!canExit);
*/